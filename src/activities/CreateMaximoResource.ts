import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface CreateMaximoResourceInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @description The resource to update.
     * @required
     */
    resource:
        | "mxaction"
        | "mxamcrew"
        | "mxasset"
        | "mxbimassetwo"
        | "mxfeature"
        | "mxinventory"
        | "mxinvoice"
        | "mxitem"
        | "mxlabor"
        | "mxperson"
        | "mxperuser"
        | "mxpo"
        | "mxpr"
        | "mxproblem"
        | "mxreceipt"
        | "mxsr"
        | "mxsrvad"
        | "mxvendor"
        | "mxwo"
        | string;

    /**
     * @description An object representing the properties of the resource to create.
     * @required
     */
    content: {
        [key: string]: any;
    };

    /**
     * @description The list of properties of the resource to return in the result. If not specified the result will be empty. For example, assetnum,status.
     */
    properties?: "*" | string;
}

/** An interface that defines the outputs of the activity. */
export interface CreateMaximoResourceOutputs {
    /**
     * @description The result of the activity. This will only have a value if the Properties input is specified.
     */
    result?: {
        href: string;
    };
}

/**
 * @category Maximo
 * @description Creates a Maximo resource.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class CreateMaximoResource implements IActivityHandler {
    async execute(
        inputs: CreateMaximoResourceInputs
    ): Promise<CreateMaximoResourceOutputs> {
        const { content, properties, resource, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }
        if (!content) {
            throw new Error("content is required");
        }

        const url = `os/${resource}`;
        const response = await post(service, url, undefined, content, {
            ...(properties ? { properties: properties } : undefined),
        });

        return {
            result: response,
        };
    }
}
