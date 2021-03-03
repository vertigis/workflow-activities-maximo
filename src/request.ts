import { MaximoService } from "./MaximoService";
import { MaximoRequestError } from "./MaximoRequestError";

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
            maxauth: service.authToken,
            ...headers,
        },
    });

    checkResponse(response);

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
            maxauth: service.authToken,
            ...headers,
        },
        body: JSON.stringify(body),
    });

    checkResponse(response);

    if (response.status === 204) {
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
            maxauth: service.authToken,
            ...headers,
        },
        body: JSON.stringify(body),
    });

    checkResponse(response);

    if (response.status === 204) {
        // No content
        return {} as T;
    }

    return await response.json();
}

export function checkResponse(response: Response, message?: string): void {
    if (!response.ok) {
        throw new MaximoRequestError(response, message);
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
