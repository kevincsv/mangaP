import Router from "../tools/router";

import * as rules from "../rules/auth";

import * as sanitizers from "../sanitizers/auth";

import * as controller from "../controllers/authController";

const router = Router();

router
    // *******************   SIGNUP   ******************* \\
    .post('/signup', router.makeMiddlewares({
        rules: rules.signup,
        sanitizers: sanitizers.signup
    }), controller.signup)

    // *******************   SHOW   ******************* \\
    .get('/me', router.makeMiddlewares({
        auth: true
    }), controller.show)

    // *******************   SIGNING   ******************* \\
    .post('/signin', router.makeMiddlewares({
        rules: rules.signin,
        sanitizers: sanitizers.signin
    }), controller.signin);


export default router;