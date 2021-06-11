import Router from "../tools/router";

import * as controller from "../controllers/mangaController";

import * as rules from "../rules/mangas";

import * as sanitizers from "../sanitizers/mangas";

import {uploadToS3} from "../tools/s3";

const router = Router();

router
    // *******************   CRUD (INDEX)   ******************* \\
    .get('/', router.makeMiddlewares({
        auth: true,
        pageable: true
    }), controller.index)

    // *******************   CRUD (SHOW)   ******************* \\
    .get('/:manga', router.makeMiddlewares({
        auth: true,
        rules: rules.show,
        sanitizers: sanitizers.show
    }), controller.show)

    // *******************   CRUD (CREATE)   ******************* \\
    .post('/', router.makeMiddlewares({
        auth: true,
        rules: rules.create,
        sanitizers: sanitizers.create,
        afterSanitizers: [uploadToS3('images/mangas/').single('image')]
    }), controller.create)

    // *******************   CRUD (UPDATE)   ******************* \\
    .put('/:manga', router.makeMiddlewares({
        auth: true,
        rules: rules.update,
        sanitizers: sanitizers.update
    }), controller.update)

    // *******************   CRUD (DELETE)   ******************* \\
    .delete('/:manga', router.makeMiddlewares({
        auth: true,
        rules: rules.destroy,
        sanitizers: sanitizers.destroy
    }), controller.destroy);

export default router;