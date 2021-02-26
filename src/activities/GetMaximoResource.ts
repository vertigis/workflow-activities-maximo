import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoResourceInputs {
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
        | "os/mxaction/{id}"
        | "os/mxamcrew/{id}"
        | "os/mxbimassetwo/{id}"
        | "os/mxperson/{id}"
        | "os/mxperuser/{id}"
        | "os/mxpo/{id}"
        | "os/mxpr/{id}"
        | "os/mxproblem/{id}"
        | "os/mxreceipt/{id}"
        | "os/mxsrvad/{id}"
        | string;

    /**
     * @description The select clause specifying the set of attributes to fetch from the object structures.
     */
    select: string;
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
 * @description Gets a list of Maximo resources.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetMaximoResource implements IActivityHandler {
    async execute(
        inputs: GetMaximoResourceInputs
    ): Promise<GetMaximoResourceOutputs> {
        const { resource, select, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }

        const response = await get(service, `oslc/${resource}`, {
            ...(select ? { "oslc.select": select } : undefined),
        });

        return {
            result: response,
        };
    }
}
