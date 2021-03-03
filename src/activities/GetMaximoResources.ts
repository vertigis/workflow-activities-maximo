import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoResourcesInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @description The name of the set of resources.
     * @required
     */
    resource:
        | "mxaction"
        | "mxamcrew"
        | "mxbimassetwo"
        | "mxperson"
        | "mxperuser"
        | "mxpo"
        | "mxpr"
        | "mxproblem"
        | "mxreceipt"
        | "mxsrvad"
        | string;

    /**
     * @description The where clause to filter the set of resources.
     */
    where: string;

    /**
     * @description The select clause specifying the set of attributes to fetch from the object structures.
     */
    select: string;

    /**
     * @description The order by clause specifying the sort order of the results. For example, -attr1,+attr2.
     */
    orderBy: string;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoResourcesOutputs {
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
export class GetMaximoResources implements IActivityHandler {
    async execute(
        inputs: GetMaximoResourcesInputs
    ): Promise<GetMaximoResourcesOutputs> {
        const { orderBy, resource, select, service, where } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }

        const response = await get(service, `oslc/os/${resource}`, {
            ...(orderBy ? { "oslc.orderBy": orderBy } : undefined),
            ...(select ? { "oslc.select": select } : undefined),
            ...(where ? { "oslc.where": where } : undefined),
        });

        return {
            result: response,
        };
    }
}
