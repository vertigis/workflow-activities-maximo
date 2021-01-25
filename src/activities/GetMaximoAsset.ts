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
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoAssetOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        "assetmeter_collectionref": string;
        "spi:autowogen": boolean;
        "spi:status": string;
        "spi:pluscisinhousecal": boolean;
        "spi:changeby": string;
        "spi:orgid": string;
        "spi:assetid": number;
        "spi:unchargedcost": number;
        "assetusercust_collectionref": string;
        "spi:expectedlife": number;
        "spi:ytdcost": number;
        "spi:rolltoallchildren": boolean;
        "_rowstamp": string;
        "spi:iscalibration": boolean;
        "spi:pluscpmextdate": boolean;
        "spi:totdowntime": number;
        "spi:islinear": boolean;
        "spi:assetnum": string;
        "spi:mainthierchy": boolean;
        "spi:removefromactivesp": boolean;
        "assetspec_collectionref": string;
        "spi:siteid": string;
        "spi:statusdate": string;
        "spi:totalcost": number;
        "spi:tloampartition": boolean;
        "spi:newsite": "DELCO",
        "spi:budgetcost": number;
        "spi:plusciscontam": boolean;
        "spi:returnedtovendor": boolean;
        "spi:disabled": boolean;
        "spi:children": boolean;
        "spi:isrunning": boolean;
        "rdf:about": string;
        "spi:changepmstatus": boolean;
        "spi:totunchargedcost": number;
        "prefixes": {
            "rdf": string;
            "spi": string;
            "oslc": string;
        },
        "spi:replacecost": number;
        "spi:invcost": number;
        "assetmntskd_collectionref": string;
        "spi:moved": boolean;
        "spi:changedate": string;
        "spi:status_description": string;
        "assetopskd_collectionref": string;
        "spi:pluscismte": boolean;
        "spi:removefromactiveroutes": boolean;
        "spi:pluscsolution": boolean;
        "spi:purchaseprice": number;
    };
}

/**
 * @category Maximo
 * @description Gets information about a single Maximo asset.
 */
export class GetMaximoAsset implements IActivityHandler {
    async execute(inputs: GetMaximoAssetInputs): Promise<GetMaximoAssetOutputs> {
        const { assetId, service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!assetId) {
            throw new Error("assetId is required");
        }

        const response = await get(service, `oslc/os/mxasset/${assetId}`);

        return {
            result: response,
        };
    }
}
