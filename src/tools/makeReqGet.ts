import {Request, Response, NextFunction} from 'express';

export default (req: Request, _res: Response, next: NextFunction) => {
    const shallowReq = {
        headers: req.headers,
        get: req.get
    };

    const customGet = (key: string, defaultValue?: any) => shallowReq.get(key) || req.query[key] || req.params[key] || req.body[key] || defaultValue;

    /**
     *
     * @param key = string | string[]
     * @param defaultValue = any | {*}
     * @returns any | {*}
     *
     **/
    req.$get = (key: string | string[], defaultValue?: any) => {
        if (Array.isArray(key)) {
            return key.reduce((accumulator: { [key: string]: any }, k) => {
                accumulator[k] = customGet(k, typeof defaultValue === 'object' ? defaultValue[k] : defaultValue);

                return accumulator;
            }, {});
        }

        return customGet(key, defaultValue);
    };

    next();
};