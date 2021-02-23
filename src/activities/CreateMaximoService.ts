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
     * @required
     */
    username: string;
    /**
     * @description The password of a Maximo user. Do not hard code passwords into workflows.
     * @required
     */
    password: string;
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
 */
export class CreateMaximoService implements IActivityHandler {
    async execute(
        inputs: CreateMaximoServiceInputs
    ): Promise<CreateMaximoServiceOutputs> {
        const { password, url, username } = inputs;
        if (!url) {
            throw new Error("url is required");
        }
        if (!username) {
            throw new Error("username is required");
        }
        if (!password) {
            throw new Error("password is required");
        }

        // Remove trailing slashes
        const normalizedUrl = url.replace(/\/*$/, "");

        const service: MaximoService = {
            url: normalizedUrl,
            authToken: btoa(`${username}:${password}`),
        };

        await post(service, "oslc/login");

        return {
            service,
        };
    }
}
