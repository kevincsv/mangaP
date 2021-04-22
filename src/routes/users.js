const router = require ('../tools/router') ();

const rules = require ('../rules/users');

const sanitizers = require('../sanitizers/users')

const controller = require ('../controllers/userController');

router
	// *******************   SIGNUP   ******************* \\
	.post ('/signup', router.makeMiddlewares ({
		rules: rules.signup,
		sanitizer: sanitizers.signup
	}), controller.signup)

	// *******************   SHOW   ******************* \\
	.get ('/me', router.makeMiddlewares ({
		auth: true
	}), controller.show)

	// *******************   SIGNING   ******************* \\
	.post ('/signing', router.makeMiddlewares ({
		rules: rules.signin,
		sanitizer: sanitizers.signin
	}), controller.signin)



module.exports = router;