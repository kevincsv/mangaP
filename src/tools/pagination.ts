import {Request} from 'express'

export default (req: Request) =>
    ({
        limit: req.query.limit,
        page: req.query.page,
        sort: {'createdAt': req.query.sort},
    })
