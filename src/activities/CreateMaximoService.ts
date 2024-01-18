import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { post } from "../request";
import { MaximoService } from "../MaximoService";

/** An interface that defines the inputs of the activity. */
export interface CreateMaximoServiceInputs {
    /* eslint-disable @typescript-eslint/no-redundant-type-constituents */

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

    /**
     * @description The application context. The default is "oslc".
     */
    context: "oslc" | "api" | string;

    /* eslint-enable @typescript-eslint/no-redundant-type-constituents */
}

/** An interface that defines the outputs of the activity. */
export interface CreateMaximoServiceOutputs {
    /**
     * @description The Maximo service that can be supplied to other Maximo activities.
     */
    service: MaximoService;
}

/**
 * @category Maximo
 * @defaultName mxService
 * @description Creates an authenticated connection to a Maximo service that can be used with other Maximo activities.
 * @clientOnly
 * @supportedApps EXB, GWV, GVH, WAB
 */
export class CreateMaximoService implements IActivityHandler {
    async execute(
        inputs: CreateMaximoServiceInputs
    ): Promise<CreateMaximoServiceOutputs> {
        const { apiKey, password, context = "oslc", url, username } = inputs;
        if (!url) {
            throw new Error("url is required");
        }
        if (!username && !password && !apiKey) {
            throw new Error("username/password or apiKey is required");
        }

        // Remove trailing slashes
        const normalizedUrl = url.replace(/\/*$/, "");
        const normalizedContext = context.replace(/\/*$/, "");

        const service: MaximoService = {
            apiKey,
            authToken:
                username && password
                    ? btoa(`${username}:${password}`)
                    : undefined,
            context: normalizedContext,
            url: normalizedUrl,
        };

        await post(service, "login");

        return {
            service,
        };
    }
}
