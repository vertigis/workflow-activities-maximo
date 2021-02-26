import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { patch } from "../request";

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
}

/**
 * @category Maximo
 * @description Updates information about a single Maximo asset.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class UpdateMaximoAsset implements IActivityHandler {
    async execute(inputs: UpdateMaximoAssetInputs): Promise<void> {
        const { asset, assetId, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!asset) {
            throw new Error("asset is required");
        }
        if (!assetId) {
            throw new Error("assetId is required");
        }

        // Get the ID from URLs
        const id = assetId.substring(assetId.lastIndexOf("/") + 1);

        await patch(service, `oslc/os/mxasset/${id}`, undefined, asset);
    }
}
