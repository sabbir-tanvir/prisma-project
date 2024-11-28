import { Httpexception } from "../exception/root";
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: Httpexception, req: Request, res: Response, next: NextFunction) => {
    console.log("there is an error");
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    });
}
