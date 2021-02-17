import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get, post } from "../request";

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
    method: "GET" | "POST";

    /**
     * @description The Maximo REST API resource or operation to request.
     * @required
     */
    path:
        | "os/mxaction"
        | "os/mxperson"
        | "os/mxperuser"
        | "os/mxpo"
        | "os/mxpr"
        | "os/mxproblem"
        | "os/mxreceipt"
        | "os/mxsrvad"
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
 * @description Sends a request to the Maximo REST API.
 */
export class SendMaximoRequest implements IActivityHandler {
    async execute(
        inputs: SendMaximoRequestInputs
    ): Promise<SendMaximoRequestOutputs> {
        const { body, method, path, query, service } = inputs;
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
            const response = await get(service, `oslc/${path}`, query);
            return {
                result: response,
            };
        } else if (method == "POST") {
            const response = await post(service, `oslc/${path}`, query, body);
            return {
                result: response,
            };
        } else {
            // eslint-disable-next-line
            throw new Error(`HTTP method '${method}' not supported.`);
        }
    }
}
