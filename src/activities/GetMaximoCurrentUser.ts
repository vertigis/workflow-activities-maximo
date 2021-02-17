import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { MaximoService } from "../MaximoService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMaximoCurrentUserInputs {
    /**
     * @description The Maximo API Service.
     * @required
     */
    service: MaximoService;
}

/** An interface that defines the outputs of the activity. */
export interface GetMaximoCurrentUserOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        address: any;
        apicachekey: string;
        baseCalendar: string;
        baseCurrency: string;
        baseLang: string;
        botcinstall: boolean;
        calendarType: string;
        canUseInactiveSites: boolean;
        city: string;
        country: string;
        customername: string;
        dateformat: string;
        datetimeformat: string;
        defaultApplication: string;
        defaultLanguage: string;
        defaultLcale: string;
        defaultOrg: string;
        defaultRepairFacility: string;
        defaultRepairSite: string;
        defaultSite: string;
        defaultSiteDescription: string;
        defaultStoreroom: string;
        defaultStoreroomSite: string;
        defaultTimeZone: string;
        displayName: string;
        displayname: string;
        displayno: string;
        displayyes: string;
        email: string;
        firstname: string;
        href: string;
        ibmId: string;
        inactiveSites: boolean;
        insertCompanySet: string;
        insertItemSet: string;
        insertOrg: string;
        insertSite: string;
        isLocalSession: boolean;
        labor: {
            laborcode: string;
            laborcraftrate: {
                skilllevel: string;
                craft: string;
                laborcode: string;
            };
        };
        langcode: string;
        lastname: string;
        location: any;
        loginID: string;
        loginUserName: string;
        personId: string;
        personid: string;
        personuid: number;
        postalcode: string;
        primaryemail: string;
        primaryphone: string;
        queryWithSite: boolean;
        stateprovince: string;
        timeformat: string;
        title: string;
        user: {
            logouttracking: {
                attemptdate: string;
                attemptdate_localized: string;
            };
        };
        userName: string;
    };
}

/**
 * @category Maximo
 * @description Gets information about the current Maximo user.
 */
export class GetMaximoCurrentUser implements IActivityHandler {
    async execute(
        inputs: GetMaximoCurrentUserInputs
    ): Promise<GetMaximoCurrentUserOutputs> {
        const { service } = inputs;
        if (!service) {
            throw new Error("service is required");
        }

        const response = await get(service, `oslc/whoami`);

        return {
            result: response,
        };
    }
}
