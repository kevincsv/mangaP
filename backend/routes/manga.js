const router = require ('../tools/router') ();

const Manga = require ('../models/Manga');

const rules = require ('../rules/mangas');


// *******************   CRUD (GET)   ******************* \\

router.get ('/', router.makeMiddlewares ({auth: true}), async (req, res) => {
	const $search = req.get ('search');
	// añadir filtros
	const mangas = await Manga.find ($search ? {$text: {$search}} : null);
	console.log (mangas);
	res.json (mangas);
});

router.get ('/:id', router.makeMiddlewares ({auth: true, rules: rules.show}), async (req, res) => {

	const mangas = await Manga.findById (req.get ('id'));
	res.json (mangas);
});

// *******************   CRUD (GET)   ******************* \\

// *******************   CRUD (POST)   ******************* \\

router.post ('/', router.makeMiddlewares ({auth: true, rules: rules.mangas}), async (req, res) => {
		const {title, author} = req.body;

		const newManga = new Manga ({
			title,
			author
		});
		await newManga.save (); //try, catch

		res.status (201).json (newManga);
	}
);

// // *******************   CRUD (POST)   ******************* \\

// // *******************   CRUD (PUT)   ******************* \\

router.put ('/:id', router.makeMiddlewares ({auth: true, rules: rules.mangas}), async (req, res) => {
		const {title, author} = req.body;

		const manga = await Manga.findByIdAndUpdate (
			req.params.id,
			{title, author}
		);
		res.json ('Manga modified successfully');
		console.log ('Manga modified successfully \n \n' + 'Status Code', 200, ' \n\n ', manga, '\n \n was replaced for \n \n', req.body);
	}
);

// // *******************  CRUD (PUT)  ******************* \\

// // *******************  CRUD (DELETE)  ******************* \\

router.delete ('/:id', router.makeMiddlewares ({auth: true, rules: rules.show}), async (req, res) => {

	await Manga.findByIdAndDelete (req.params.id);

	res.json ('Manga deleted successfully');

	console.log ('Manga deleted successfully \n \n', 204);
});

// *******************  CRUD (DELETE)  ******************* \\

module.exports = router;
