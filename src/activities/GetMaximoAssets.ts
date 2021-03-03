import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoAssetsInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

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
     * @description Whether to return only the total number of results matching the search criteria. The default is false.
     */
    countOnly: boolean;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoAssetsOutputs {
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
 * @description Gets Maximo assets.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetMaximoAssets implements IActivityHandler {
    async execute(
        inputs: GetMaximoAssetsInputs
    ): Promise<GetMaximoAssetsOutputs> {
        const { countOnly, orderBy, select, service, where } = inputs;
        if (!service) {
            throw new Error("service is required");
        }

        const response = await get(service, `oslc/os/mxasset`, {
            ...(countOnly ? { count: 1 } : undefined),
            ...(orderBy ? { "oslc.orderBy": orderBy } : undefined),
            ...(select ? { "oslc.select": select } : undefined),
            ...(where ? { "oslc.where": where } : undefined),
        });

        return {
            result: response,
        };
    }
}
