import {IRouter, Router, RouterOptions} from "express";

import makeMiddlewares, {IMakeMiddleware, TMiddlewareRuled} from "./makeMiddlewares";

interface CRouter extends IRouter {
    makeMiddlewares: (options: IMakeMiddleware) => TMiddlewareRuled
}

export default (options?: RouterOptions) => {
    const router = Router(options)

    // @ts-ignore
    router.makeMiddlewares = makeMiddlewares;

    return router as CRouter
}