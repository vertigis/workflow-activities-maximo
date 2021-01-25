export class MaximoRequestError extends Error {
    readonly response: Response;

    constructor(response: Response, message?: string) {
        super(message || "Maximo request failed.");
        this.response = response;
    }
}
