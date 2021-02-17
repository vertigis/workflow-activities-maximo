import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoAssetInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;

    /**
     * @displayName Asset ID
     * @description The ID of the asset.
     * @required
     */
    assetId: string;

    /**
     * @description The select clause specifying the set of attributes to fetch from the object structures.
     */
    select: string;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoAssetOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        assetid: number;
        assetmeter_collectionref: string;
        assetmntskd_collectionref: string;
        assetnum: string;
        assetopskd_collectionref: string;
        assetspec: [];
        assetspec_collectionref: string;
        assetusercust_collectionref: string;
        autowogen: boolean;
        budgetcost: number;
        changeby: string;
        changedate: string;
        changepmstatus: boolean;
        children: boolean;
        description: string;
        disabled: boolean;
        expectedlife: number;
        expectedlifedate: string;
        hierarchypath: string;
        href: string;
        installdate: string;
        invcost: number;
        iscalibration: boolean;
        islinear: boolean;
        isrunning: boolean;
        itemnum: string;
        itemsetid: string;
        location: string;
        manufacturer: string;
        mainthierchy: boolean;
        moved: boolean;
        newsite: string;
        orgid: string;
        pluscpmextdate: boolean;
        plusciscontam: boolean;
        pluscisinhousecal: boolean;
        pluscismte: boolean;
        pluscsolution: boolean;
        purchaseprice: number;
        priority: number;
        removefromactiveroutes: boolean;
        removefromactivesp: boolean;
        replacecos: number;
        replacecost: number;
        returnedtovendor: boolean;
        rolltoallchildren: boolean;
        rotsuspacct: string;
        siteid: string;
        status: string;
        statusdate: string;
        status_description: string;
        tloampartition: boolean;
        totalcost: number;
        totdowntime: number;
        totunchargedcost: number;
        unchargedcost: number;
        vendor: string;
        ytdcost: number;
        _rowstamp: string;
    };
}

/**
 * @category Maximo
 * @description Gets information about a single Maximo asset.
 */
export class GetMaximoAsset implements IActivityHandler {
    async execute(
        inputs: GetMaximoAssetInputs
    ): Promise<GetMaximoAssetOutputs> {
        const { assetId, select, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!assetId) {
            throw new Error("assetId is required");
        }

        // Get the ID from URLs
        const id = assetId.substring(assetId.lastIndexOf("/") + 1);

        const response = await get(service, `oslc/os/mxasset/${id}`, {
            ...(select ? { "oslc.select": select } : undefined),
        });

        return {
            result: response,
        };
    }
}
