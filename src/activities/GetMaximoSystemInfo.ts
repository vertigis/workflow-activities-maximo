import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoSystemInfoInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoSystemInfoOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        appServer: string;
        appVersion: {
            member: {
                versionKey: string;
            }[];
        };
        database: {
            dbProductName: string;
            dbVersion: string;
            dbMajorVersion: number;
            dbMinorVersion: number;
        };
        os: {
            osName: string;
            osVersion: string;
            architecture: string;
            availableProcessors: number;
        };
    };
}

/**
 * @category Maximo
 * @description Gets system information about the Maximo service.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetMaximoSystemInfo implements IActivityHandler {
    async execute(
        inputs: GetMaximoSystemInfoInputs
    ): Promise<GetMaximoSystemInfoOutputs> {
        const { service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }

        const response = await get(service, `oslc/systeminfo`);

        return {
            result: response,
        };
    }
}
