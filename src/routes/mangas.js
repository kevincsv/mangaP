const router = require('../tools/router')();

const rules = require('../rules/mangas');

const sanitizers = require('../sanitizers/mangas');

const controller = require('../controllers/mangaController');


router
	// *******************   CRUD (INDEX)   ******************* \\
	.get('/', router.makeMiddlewares({auth: true}), controller.index)
 
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
		sanitizers: sanitizers.create
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
		rules: rules.delete,
		sanitizers: sanitizers.delete
	}), controller.delete);

module.exports = router;
