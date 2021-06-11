// const MongooseError = require ('mongoose/lib/error');
import {Request, Response, NextFunction} from 'express'

interface ErrorResponse {
    status?: number;
    message?: string;
}

export default (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    // console.log (123, typeof err, err instanceof MongooseError);
    if (process.env.DEBUG_GLOBAL) {
        console.log(err);
    }

    res.status(err.status || 500).json({
        error: {
            msg: err.message || 'Something went wrong'
        }
    });
};
