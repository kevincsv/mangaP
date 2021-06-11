import {Request, Response, NextFunction} from 'express'

import pagination from "../tools/pagination";

export default (req: Request, _res: Response, next: NextFunction): void => {
    // @ts-ignore
    req.pagination = () => pagination(req);

    next();
};



