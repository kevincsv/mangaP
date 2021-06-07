const Manga = require('../models/Manga');


// *******************   CRUD (Index)   ******************* \\
exports.index = async (req, res, next) => {
	try {
		const mangas = await Manga.search(req.get('search'))
			.then(({filter, query}) => query.paginate(filter, req.pagination()));

		res.toJSON(mangas);
	} catch (err) {
		next(err);
	}
};

// *******************   CRUD (Show)   ******************* \\
exports.show = async (req, res) => {
	res.toJSON(req.get('manga'));
};

// *******************   CRUD (Create)   ******************* \\
exports.create = async (req, res, next) => {
	try {
		const data = req.get(['title', 'author', 'genre', 'description']);
		const file = req.file;

		if (file) {
			data.imagePath = file.location;
			data.imageKey = file.key;
		}
		const manga = await Manga.create(data);

		res.status(201).toJSON(manga);
	} catch (err) {
		next(err);
	}
};

// *******************   CRUD (Update)   ******************* \\
exports.update = async (req, res, next) => {
	try {
		const data = req.get(['title', 'author', 'genre', 'description']);
		const manga = req.get('manga');

		Object.assign(manga, data);
		await manga.save();

		res.toJSON(manga);
	} catch (err) {
		next(err);
	}
};

// *******************   CRUD (Delete)   ******************* \\
exports.delete = async (req, res, next) => {
	try {
		const manga = req.get('manga');

		await manga.delete();

		res.status(204).json('Manga deleted');
	} catch (err) {
		next(err);
	}
};