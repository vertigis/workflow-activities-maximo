import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { httpDelete } from "../request";
import { getIdFromIdOrUrl } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface DeleteMaximoResourceInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @description The resource to delete.
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
     * @description The ID of the resource to delete.
     */
    id: string;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
}

/** An interface that defines the outputs of the activity. */
export interface DeleteMaximoResourceOutputs {
    /**
     * @description The result of the activity.
     */
    result: any;
}

/**
 * @category Maximo
 * @description Deletes a Maximo resource.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class DeleteMaximoResource implements IActivityHandler {
    async execute(
        inputs: DeleteMaximoResourceInputs
    ): Promise<DeleteMaximoResourceOutputs> {
        const { id, resource, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }

        const url = `os/${resource}/${getIdFromIdOrUrl(id)}`;
        const response = await httpDelete(service, url);

        return {
            result: response,
        };
    }
}
