import BaseError from "./BaseError";
import { ErrorType } from "./ErrorType";

export class HttpRequestError extends BaseError {
    public readonly error: { code: number, details: any };

    constructor(errorType: ErrorType, details?: any) {
        super();
        this.error = {
            code: errorType,
            details: details || { messsage: ErrorType[errorType] }
        }
        if (typeof this.error.details === 'string') {
            this.error.details = { messsage: this.error.details }
        }
    }
}