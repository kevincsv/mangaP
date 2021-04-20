const router = require ('../tools/router') ();

const rules = require ('../rules/mangas');

const sanitizers = require ('../sanitizers/mangas');

const controller = require ('../controllers/manga');


router
	// *******************   CRUD (Index)   ******************* \\
	.get ('/', router.makeMiddlewares ({auth: true}), controller.index)

	// *******************   CRUD (Show)   ******************* \\
	.get ('/:manga', router.makeMiddlewares ({
		auth: true,
		rules: rules.show,
		sanitizers: sanitizers.show
	}), controller.show)

	// *******************   CRUD (Create)   ******************* \\
	.post ('/', router.makeMiddlewares ({
		auth: true,
		rules: rules.create,
		sanitizers: sanitizers.create
	}), controller.create)

	// *******************   CRUD (Update)   ******************* \\
	.put ('/:manga', router.makeMiddlewares ({
		auth: true,
		rules: rules.update,
		sanitizers: sanitizers.update
	}), controller.update)

	// *******************   CRUD (Delete)   ******************* \\
	.delete ('/:manga', router.makeMiddlewares ({
		auth: true,
		rules: rules.delete,
		sanitizers: sanitizers.delete
	}), controller.delete);

module.exports = router;
