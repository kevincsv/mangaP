import {Request, Response} from 'express'

import Router from "../tools/router";

const router = Router();

router.get('/', router.makeMiddlewares({auth: true}), (_req: Request, res: Response) => {
    res.redirect('/mangas');
});

export default router;