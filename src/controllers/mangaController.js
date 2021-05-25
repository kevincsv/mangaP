const Manga = require('../models/Manga');
const {unlink} = require('fs-extra');
const path = require('path');

// const {uploadFile} = require('../S3');

const algoliasearch = require('algoliasearch');

const client = algoliasearch(process.env.ALG_APP_ID, process.env.ALG_ADMIN);
const index = client.initIndex(process.env.ALG_DEV_INDEX);

// *******************   CRUD (Index)   ******************* \\
exports.index = async (req, res, next) => {
	try {
		let filter = {};
		const $search = req.get('search');

		if ($search) {
			const searchResult = await index.search($search, {
				attributesToRetrieve: [
					'objectID'
				],
				attributesToHighlight: [
					0
				]
			}, '').then(({hits}) => hits.map(({objectID}) => objectID));

			filter = {_id: {$in: searchResult}};
		}

		const limit = parseInt(req.query.limit, 10) || 10;
		const page = parseInt(req.query.page, 10) || 1;
		const sort = {createdAt: req.query.sort} || {createdAt: 1};

		const mangas = await Manga.paginate(filter, {limit, page, sort});

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

		if (req.file) {
			data.imagePath = '/uploads/' + req.file.filename;
		}

		const manga = await Manga.create(data);

		const objects = [{
			title: manga.title,
			author: manga.author,
			objectID: manga._id
		}];

		await index.saveObjects(objects);


		res.status(201).toJSON(manga);
	} catch
		(err) {
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

		const objects = [{
			title: manga.title,
			author: manga.author,
			objectID: manga._id
		}];

		await index.saveObjects(objects);

		res.toJSON(manga);
	} catch (err) {
		next(err);
	}
};

// *******************   CRUD (Delete)   ******************* \\
exports.delete = async (req, res, next) => {
	try {
		const manga = req.get('manga');

		index.deleteObjects([manga._id]).then(() => {
			// Algolia index deleted
		});
		await manga.delete();

		if (manga.imagePath) {
			unlink(path.resolve('./src/public' + manga.imagePath));
		}

		res.status(204).json('Manga deleted');
	} catch (err) {
		next(err);
	}
};