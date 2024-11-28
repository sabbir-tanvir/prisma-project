import { Httpexception } from "./root";

export class InternalExpectation extends Httpexception {
    constructor(message: string, errorCode: number, error: any) {
        super(message, errorCode, 500, error)
    }
}