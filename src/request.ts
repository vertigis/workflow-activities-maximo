import { MaximoService } from "./MaximoService";
import { MaximoRequestError } from "./MaximoRequestError";

export async function get<T = any>(
    service: MaximoService,
    path: string,
    params?: Record<string, string | number | boolean | null | undefined>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const qs = objectToQueryString(params);
    const url = `${service.url}/${path}${qs ? "?" + qs : ""}`;
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            maxauth: service.authToken,
        },
    });

    checkResponse(response);

    return await response.json();
}

export async function post<T = any>(
    service: MaximoService,
    path: string,
    data?: Record<string, any>
): Promise<T> {
    if (!service.url) {
        throw new Error("url is required");
    }

    const url = `${service.url}/${path}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            maxauth: service.authToken,
        },
        body: JSON.stringify(data),
    });

    checkResponse(response);

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
