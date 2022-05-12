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
     * @description The where clause to filter the set of resources. For example, status in ["OPERATING","ACTIVE"] and priority=3.
     */
    where: string;

    /**
     * @description The select clause specifying the set of attributes to fetch from the object structures. For example, assetnum,status.
     */
    select: string;

    /**
     * @description The order by clause specifying the sort order of the results. For example, -attr1,+attr2.
     */
    orderBy: string;

    /**
     * @description The number of results to include in the response.
     */
    pageSize: number;

    /**
     * @description Whether to return only the total number of results matching the search criteria. The default is false.
     */
    countOnly: boolean;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoResourcesOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        href?: string;
        member?: {
            href: string;
        }[];
        totalCount?: number;
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
        const {
            countOnly,
            orderBy,
            pageSize,
            resource,
            select,
            service,
            where,
        } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!resource) {
            throw new Error("resource is required");
        }

        const response = await get(service, `os/${resource}`, {
            ...(countOnly ? { count: 1 } : undefined),
            ...(orderBy ? { "oslc.orderBy": orderBy } : undefined),
            ...(pageSize ? { "oslc.pageSize": pageSize } : undefined),
            ...(select ? { "oslc.select": select } : undefined),
            ...(where ? { "oslc.where": where } : undefined),
        });

        return {
            result: response,
        };
    }
}
