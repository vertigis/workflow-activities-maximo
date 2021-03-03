import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get, httpDelete, patch, post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface SendMaximoRequestInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @description The HTTP request method.
     * @required
     */
    method: "GET" | "POST" | "PATCH" | "DELETE";

    /**
     * @description The Maximo REST API resource or operation to request.
     * @required
     */
    path:
        | "os/mxaction"
        | "os/mxamcrew"
        | "os/mxasset"
        | "os/mxbimassetwo"
        | "os/mxfeature"
        | "os/mxinventory"
        | "os/mxinvoice"
        | "os/mxitem"
        | "os/mxlabor"
        | "os/mxperson"
        | "os/mxperuser"
        | "os/mxpo"
        | "os/mxpr"
        | "os/mxproblem"
        | "os/mxreceipt"
        | "os/mxsr"
        | "os/mxsrvad"
        | "os/mxvendor"
        | "os/mxwo"
        | string;

    /**
     * @description The query string parameters to send on the request.
     */
    query?: {
        [key: string]: any;
    };

    /**
     * @description The body of the request.
     */
    body?: {
        [key: string]: any;
    };

    /**
     * @description The headers to send on the request.
     */
    headers?: {
        [key: string]: any;
    };
}

/** An interface that defines the outputs of the activity. */
export interface SendMaximoRequestOutputs {
    /**
     * @description The result of the activity.
     */
    result: any;
}

/**
 * @category Maximo
 * @defaultName mxRequest
 * @description Sends a request to the Maximo REST API.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class SendMaximoRequest implements IActivityHandler {
    async execute(
        inputs: SendMaximoRequestInputs
    ): Promise<SendMaximoRequestOutputs> {
        const { body, headers, method, path, query, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!method) {
            throw new Error("method is required");
        }
        if (!path) {
            throw new Error("path is required");
        }

        if (method == "GET") {
            const response = await get(service, `oslc/${path}`, query, headers);
            return {
                result: response,
            };
        } else if (method == "POST") {
            const response = await post(
                service,
                `oslc/${path}`,
                query,
                body,
                headers
            );
            return {
                result: response,
            };
        } else if (method == "PATCH") {
            const response = await patch(
                service,
                `oslc/${path}`,
                query,
                body,
                headers
            );
            return {
                result: response,
            };
        } else if (method == "DELETE") {
            const response = await httpDelete(
                service,
                `oslc/${path}`,
                query,
                body,
                headers
            );
            return {
                result: response,
            };
        } else {
            // eslint-disable-next-line
            throw new Error(`HTTP method '${method}' not supported.`);
        }
    }
}
