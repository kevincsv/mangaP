import {Request, Response, NextFunction} from 'express'
import {merge} from "lodash";
import {PaginateResult} from 'mongoose'

import {IToJSONDoc} from './makeModelToJson'

type ModelType = IToJSONDoc | IToJSONDoc[] | PaginateResult<any>

const getMeta = (document: PaginateResult<any>) => {
    const {totalDocs, limit, totalPages, page, pagingCounter} = document;

    return {
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter
    };
};

const getLinks = (document: PaginateResult<any>) => {
    const {hasPrevPage, hasNextPage, prevPage, nextPage} = document;

    return {
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    };
};

const getExtra = (document: ModelType, extra = {}) => {
    if ((document as PaginateResult<any>).docs) {
        merge(extra, {
            meta: getMeta(document as PaginateResult<any>),
            links: getLinks(document as PaginateResult<any>)
        });
    }

    return extra;
};

const getData = (document: ModelType) => {
    const docs = (document as PaginateResult<any>).docs

    if (docs) {
        console.log(docs)

        return docs.map((m) => m.$toJSON());
    }

    if (Array.isArray(document)) {
        return document.map((m) => m.$toJSON());
    }

    return (document as IToJSONDoc).$toJSON();
};

export default (_req: Request, res: Response, next: NextFunction) => {
    res.toJSON = (document: ModelType, extra = {}) => res.json({
        data: getData(document),
        ...getExtra(document, extra)
    });

    next();
};