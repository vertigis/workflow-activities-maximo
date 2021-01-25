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
     * @description The where clause to filter the set of resources.
     * @required
     */
    where: string;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoAssetsOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        prefixes: {
            rdf: string;
            rdfs: string;
            oslc: string;
        },
        "oslc:responseInfo": {
            "rdf:about": string;
        },
        "rdfs:member": {
            "rdf:resource": string;
        }[],
        "rdf:about": string;
    };
}

/**
 * @category Maximo
 * @description Gets Maximo assets.
 */
export class GetMaximoAssets implements IActivityHandler {
    async execute(inputs: GetMaximoAssetsInputs): Promise<GetMaximoAssetsOutputs> {
        const { service, where } = inputs;
        if (!service) {
            throw new Error("service is required");
        }
        if (!where) {
            throw new Error("where is required");
        }

        const response = await get(service, `oslc/os/mxasset`, {
            "oslc.where": where,
        });

        return {
            result: response,
        };
    }
}
