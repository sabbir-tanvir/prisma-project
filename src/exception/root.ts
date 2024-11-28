export class Httpexception extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCodes;

    constructor(message: string, errorCode: ErrorCodes, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export  enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    INVALID_PASSWORD = 1002,
    INVALID_TOKEN = 1003,
    USER_ALREADY_EXISTS = 1004,
    UNAUTHORIZED = 1005,
    UNPROCESSABLE_ENTITY = 1006,
    INTERNAL_SERVER_ERROR = 1007,
}