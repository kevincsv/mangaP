const controller = require('../controllers/mangaController');

const router = require('../tools/router')();

const rules = require('../rules/mangas');

const sanitizers = require('../sanitizers/mangas');

const uploadS3 = require('../tools/s3');

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
		afterSanitizers: [uploadS3('images/mangas/').single('image')]
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