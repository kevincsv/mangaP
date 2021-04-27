const router = require('../tools/router')();

const rules = require('../rules/auth');

const sanitizers = require('../sanitizers/auth');

const controller = require('../controllers/authController');

router
	// *******************   SIGNUP   ******************* \\
	.post('/signup', router.makeMiddlewares({
		rules: rules.signup,
		sanitizer: sanitizers.signup
	}), controller.signup)

	// *******************   SHOW   ******************* \\
	.get('/me', router.makeMiddlewares({
		auth: true
	}), controller.show)

	// *******************   SIGNING   ******************* \\
	.post('/signing', router.makeMiddlewares({
		rules: rules.signin,
		sanitizer: sanitizers.signin
	}), controller.signin);


module.exports = router;