const Manga = require ('../models/Manga');

// *******************   CRUD (Index)   ******************* \\
exports.index = async (req, res, next) => {
	try {
		const $search = req.get ('search');
		// añadir filtros
		const mangas = await Manga.find ($search ? {$text: {$search}} : null);
		res.json (mangas);
	} catch (err) {
		next (err);
	}
};

// *******************   CRUD (Show)   ******************* \\

exports.show = async (req, res) => {
	res.json (req.get ('manga'));
};

// *******************   CRUD (Create)   ******************* \\

exports.create = async (req, res, next) => {
	try {
		const data = req.get (['title', 'author', 'description']);

		const manga = await Manga.create (data);

		res.status (201).json (manga);
	} catch (err) {
		next (err);
	}
};

// *******************   CRUD (Update)   ******************* \\

exports.update = (req, res, next) => {
	try {
		const data = req.get (['title', 'author', 'description']);
		const manga = req.get ('manga');

		Object.assign (manga, data);
		manga.save ();

		res.status (200).json (manga);
	} catch (err) {
		next (err);
	}
};

// *******************   CRUD (Delete)   ******************* \\

exports.delete = async (req, res, next) => {
	try {
		const manga = req.get ('manga');
		await manga.delete ();

		res.status (204).json ();
	} catch (err) {
		next (err);
	}
};