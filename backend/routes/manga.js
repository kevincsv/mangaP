const {Router} = require ('express');
const router = Router ();

const Manga = require ('../models/Manga');

const verifyToken = require ('../middlewares/verifyToken');
const rules = require ('../rules/mangas');
const idRules = require ('../rules/mangaId');
const validator = require ('../tools/validator');

// *******************   CRUD (GET)   ******************* \\

router.get ('/', verifyToken, async (req, res) => {
	const mangas = await Manga.find ({}, {date: 0});
	console.log (mangas);
	res.json (mangas);
});

router.get ('/:id', verifyToken, idRules, async (req, res) => {

	const mangas = await Manga.findById (req.get ('id'));
	res.json (mangas);
});

// *******************   CRUD (GET)   ******************* \\

// *******************   CRUD (POST)   ******************* \\

router.post ('/', verifyToken, validator, rules, async (req, res) => {
		const {title, author} = req.body;

		const newManga = new Manga ({
			title,
			author
		});
		await newManga.save ();

		res.json ('Manga Uploaded successfully');

		console.log ('Manga Uploaded successfully', 201, newManga);
	}
);

// // *******************   CRUD (POST)   ******************* \\

// // *******************   CRUD (PUT)   ******************* \\

router.put ('/:id', verifyToken, rules, async (req, res) => {
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

router.delete ('/:id', verifyToken, idRules, async (req, res) => {

	await Manga.findByIdAndDelete (req.params.id);

	res.json ('Manga deleted successfully');

	console.log ('Manga deleted successfully \n \n', 204);
});

// *******************  CRUD (DELETE)  ******************* \\

module.exports = router;
