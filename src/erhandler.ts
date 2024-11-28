import { NextFunction, Request, Response } from "express"
import { ErrorCodes, Httpexception } from "./exception/root";
import { InternalExpectation } from "./exception/intexception";


export const errorhandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
           await method(req, res, next);

        } catch (error: any) {
            let exception: Httpexception;
            if (error instanceof Httpexception) {
                exception = error;

            } else {
                exception = new InternalExpectation("something is wrong", error, ErrorCodes.INTERNAL_SERVER_ERROR);
            }
            next(exception);

        }


    }
}



