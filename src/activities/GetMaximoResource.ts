import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";
import { getIdFromIdOrUrl } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoResourceInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @description The resource to fetch.
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
     * @description The ID of the resource to fetch.
     * @required
     */
    id: string;

    /**
     * @description The select clause specifying the set of attributes to fetch from the object structures.
     */
    select: string;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoResourceOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        href: string;
    };
}

/**
 * @category Maximo
 * @description Gets information about a single Maximo resource.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class GetMaximoResource implements IActivityHandler {
    async execute(
        inputs: GetMaximoResourceInputs
    ): Promise<GetMaximoResourceOutputs> {
        const { id, resource, select, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }
        if (!id) {
            throw new Error("id is required");
        }

        const response = await get(
            service,
            `os/${resource}/${getIdFromIdOrUrl(id)}`,
            {
                ...(select ? { "oslc.select": select } : undefined),
            }
        );

        return {
            result: response,
        };
    }
}
