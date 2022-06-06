import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { post } from "../request";
import { getIdFromIdOrUrl } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface UpdateMaximoResourceInputs {
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
     * @displayName ID
     * @description The ID of the resource to update.
     */
    id: string;

    /**
     * @description An object representing the properties of the resource to update.
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
export interface UpdateMaximoResourceOutputs {
    /**
     * @description The result of the activity. This will only have a value if the Properties input is specified.
     */
    result?: {
        href: string;
    };
}

/**
 * @category Maximo
 * @description Creates or updates a Maximo resource.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class UpdateMaximoResource implements IActivityHandler {
    async execute(
        inputs: UpdateMaximoResourceInputs
    ): Promise<UpdateMaximoResourceOutputs> {
        const { content, id, properties, resource, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }
        if (!content) {
            throw new Error("content is required");
        }

        const idInPath = id ? "/" + getIdFromIdOrUrl(id) : "";
        const url = `os/${resource}${idInPath}`;
        const response = await post(service, url, undefined, content, {
            "x-method-override": id ? "PATCH" : "SYNC",
            patchtype: "MERGE",
            ...(properties ? { properties: properties } : undefined),
        });

        return {
            result: response,
        };
    }
}
