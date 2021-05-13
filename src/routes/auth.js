const router = require('../tools/router')();

const rules = require('../rules/auth');

const sanitizers = require('../sanitizers/auth');

const controller = require('../controllers/authController');

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


module.exports = router;