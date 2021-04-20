const router = require ('../tools/router') ();

const Manga = require ('../models/Manga');

const rules = require ('../rules/mangas');

const apiError = require ('../tools/apiErrors');


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

// *******************   CRUD (POST)   ******************* \\

// *******************   CRUD (PUT)   ******************* \\

router.put ('/:id', router.makeMiddlewares ({auth: true, rules: rules.mangas}), async (req, res) => {
	try {
		const {title, author} = req.get ('ids');

		await Manga.findByIdAndUpdate (req.get ('id'), {title, author});
		res.status (200).json (req.body);
	} catch (err) {
		console.error (err);
	}
});

// *******************  CRUD (PUT)  ******************* \\

// *******************  CRUD (DELETE)  ******************* \\

router.delete ('/:id', router.makeMiddlewares ({auth: true, rules: rules.show}), async (req, res) => {
	try {
		const manga = await Manga.findById (req.get ('id'));
		await Manga.findByIdAndDelete (req.get ('id'));
		res.status (200).json (manga);
	} catch (error) {
		console.log (error);
	}

});

// *******************  CRUD (DELETE)  ******************* \\

module.exports = router;
