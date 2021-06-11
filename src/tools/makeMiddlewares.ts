import {ValidationChain} from 'express-validator'
import {NextFunction, Request, Response} from "express";

import validateRequest from "./validator";

import Auth from "../middlewares/auth";

import paginationRules from "../rules/pagination";

import paginationSanitizer from "../sanitizers/pagination";

import paginationMiddleware from "../middlewares/pagination";

export interface IMakeMiddleware {
    auth?: boolean
    pageable?: boolean
    beforeValidators?: TMiddleware[]
    rules?: TMiddlewareRuled
    afterValidators?: TMiddleware[]
    sanitizers?: TMiddlewareRuled
    afterSanitizers?: TMiddleware[]
}

export type TMiddleware = (req: Request, res: Response, next: NextFunction) => void

export type TMiddlewareRuled = Array<ValidationChain | TMiddleware>

export default ({
                    auth = false,
                    pageable = false,
                    beforeValidators = [],
                    rules = [],
                    afterValidators = [],
                    sanitizers = [],
                    afterSanitizers = []
                }: IMakeMiddleware = {}): TMiddlewareRuled => [
    ...(auth ? [Auth] : []),
    ...beforeValidators,
    ...rules.concat(pageable ? paginationRules : [], rules.length ? validateRequest : []),
    ...afterValidators,
    ...sanitizers.concat(pageable ? paginationSanitizer : []),
    ...(afterSanitizers.concat(pageable ? paginationMiddleware : []))
];
