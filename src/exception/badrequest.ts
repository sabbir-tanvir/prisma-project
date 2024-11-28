import { ErrorCodes, Httpexception } from "./root";

export class BadRequest extends Httpexception {
    constructor(message:string, errorCode:ErrorCodes) {
        super(message, errorCode, 400, null);
    }
}