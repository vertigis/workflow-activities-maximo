import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { post } from "../request";
import { MaximoService } from "../MaximoService";

/** An interface that defines the inputs of the activity. */
export interface CreateMaximoServiceInputs {
    /**
     * @displayName URL
     * @description The URL to the Maximo service.
     * @required
     */
    url: string;

    /**
     * @description The username of a Maximo user.
     */
    username: string;

    /**
     * @description The password of a Maximo user. Do not hard code passwords into workflows.
     */
    password: string;

    /**
     * @displayName API Key
     * @description A Maximo API key.
     */
    apiKey: string;
}

/** An interface that defines the outputs of the activity. */
export interface CreateMaximoServiceOutputs {
    /**
     * @description The Maximo service that can be supplied to other FME activities.
     */
    service: MaximoService;
}

/**
 * @category Maximo
 * @defaultName mxService
 * @description Creates an authenticated connection to a Maximo service that can be used with other Maximo activities.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class CreateMaximoService implements IActivityHandler {
    async execute(
        inputs: CreateMaximoServiceInputs
    ): Promise<CreateMaximoServiceOutputs> {
        const { apiKey, password, url, username } = inputs;
        if (!url) {
            throw new Error("url is required");
        }
        if (!username && !password && !apiKey) {
            throw new Error("username/password or apiKey is required");
        }

        // Remove trailing slashes
        const normalizedUrl = url.replace(/\/*$/, "");

        const service: MaximoService = {
            url: normalizedUrl,
            authToken:
                username && password
                    ? btoa(`${username}:${password}`)
                    : undefined,
            apiKey,
        };

        await post(service, "oslc/login");

        return {
            service,
        };
    }
}
