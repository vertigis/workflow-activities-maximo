import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { patch } from "../request";
import { getIdFromIdOrUrl } from "../utils";

/** An interface that defines the inputs of the activity. */
export interface UpdateMaximoAssetInputs {
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
     * @description An object representing the properties of the asset to update.
     * @required
     */
    asset: {
        autowogen?: boolean;
        budgetcost?: number;
        description?: string;
        disabled?: boolean;
        expectedlife?: number;
        expectedlifedate?: string;
        installdate?: string;
        invcost?: number;
        iscalibration?: boolean;
        islinear?: boolean;
        isrunning?: boolean;
        location?: string;
        manufacturer?: string;
        mainthierchy?: boolean;
        moved?: boolean;
        pluscpmextdate?: boolean;
        plusciscontam?: boolean;
        pluscisinhousecal?: boolean;
        pluscismte?: boolean;
        pluscsolution?: boolean;
        purchaseprice?: number;
        priority?: number;
        removefromactiveroutes?: boolean;
        removefromactivesp?: boolean;
        replacecos?: number;
        replacecost?: number;
        returnedtovendor?: boolean;
        rolltoallchildren?: boolean;
        rotsuspacct?: string;
        status?: string;
        statusdate?: string;
        status_description?: string;
        tloampartition?: boolean;
        totalcost?: number;
        totdowntime?: number;
        totunchargedcost?: number;
        unchargedcost?: number;
        vendor?: string;
        ytdcost?: number;
    };

    /**
     * @description The list of properties of the asset to return in the result. If not specified the result will be empty. For example, assetnum,status.
     */
    properties?: "*" | string;
}

/** An interface that defines the outputs of the activity. */
export interface UpdateMaximoAssetOutputs {
    /**
     * @description The result of the activity. This will only have a value if the Properties input is specified.
     */
    result?: {
        href: string;
    };
}

/**
 * @category Maximo
 * @description Updates information about a single Maximo asset.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class UpdateMaximoAsset implements IActivityHandler {
    async execute(
        inputs: UpdateMaximoAssetInputs
    ): Promise<UpdateMaximoAssetOutputs> {
        const { asset, assetId, properties, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!asset) {
            throw new Error("asset is required");
        }
        if (!assetId) {
            throw new Error("assetId is required");
        }

        const id = getIdFromIdOrUrl(assetId);

        const response = await patch(
            service,
            `os/mxasset/${id}`,
            undefined,
            asset,
            {
                patchtype: "MERGE",
                ...(properties ? { properties: properties } : undefined),
            }
        );

        return {
            result: response,
        };
    }
}
