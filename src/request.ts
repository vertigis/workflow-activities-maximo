import { MaximoService } from "./MaximoService";
import { MaximoRequestError } from "./MaximoRequestError";

function getAuthHeaders(service: MaximoService) {
    return {
        ...(service.apiKey ? { apikey: service.apiKey } : undefined),
        ...(service.authToken ? { maxauth: service.authToken } : undefined),
    };
}

export async function get<T = any>(
    service: MaximoService,
    path: string,
    query?: Record<string, string | number | boolean | null | undefined>,
    headers?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString({ lean: 1, ...query });
    const url = `${service.url}/${path}${qs ? "?" + qs : ""}`;
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            ...getAuthHeaders(service),
            ...headers,
        },
    });

    await checkResponse(response);

    return await response.json();
}

export async function post<T = any>(
    service: MaximoService,
    path: string,
    query?: Record<string, string | number | boolean | null | undefined>,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString({ lean: 1, ...query });
    const url = `${service.url}/${path}${qs ? "?" + qs : ""}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...getAuthHeaders(service),
            ...headers,
        },
        body: JSON.stringify(body),
    });

    await checkResponse(response);

    if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
    ) {
        // No content
        return {} as T;
    }

    return await response.json();
}

export function patch<T = any>(
    service: MaximoService,
    path: string,
    query?: Record<string, string | number | boolean | null | undefined>,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    return post<T>(service, path, query, body, {
        "x-method-override": "PATCH",
        ...getAuthHeaders(service),
        ...headers,
    });
}

export async function httpDelete<T = any>(
    service: MaximoService,
    path: string,
    query?: Record<string, string | number | boolean | null | undefined>,
    body?: Record<string, any>,
    headers?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString({ lean: 1, ...query });
    const url = `${service.url}/${path}${qs ? "?" + qs : ""}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...getAuthHeaders(service),
            ...headers,
        },
        body: JSON.stringify(body),
    });

    await checkResponse(response);

    if (response.status === 204) {
        // No content
        return {} as T;
    }

    return await response.json();
}

export async function checkResponse(
    response: Response,
    message?: string
): Promise<void> {
    if (!response.ok) {
        // Try to read the error body of the response
        let error: Record<string, any> | undefined;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            try {
                const responseJson = await response.json();
                error = responseJson?.Error || responseJson;
            } catch {
                // Swallow errors reading the response so that we don't mask the original failure
            }
        }
        throw new MaximoRequestError(response.status, error, message);
    }
}

function objectToQueryString(
    data?: Record<string, string | number | boolean | null | undefined>
): string {
    if (!data) {
        return "";
    }
    return Object.keys(data)
        .map((k) => {
            const value = data[k];
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            return `${encodeURIComponent(k)}=${encodeURIComponent(
                valueToEncode
            )}`;
        })
        .join("&");
}
