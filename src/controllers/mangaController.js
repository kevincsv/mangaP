const Manga = require('../models/Manga');
const {unlink} = require('fs-extra');
const path = require('path');
const fs = require('fs');

const {pipe} = require('fs');

const algoliasearch = require('algoliasearch');

const {uploadToS3, getFileStream} = require('../S3');

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
		const file = req.file;

		if (file) {
			data.imagePath = '/mangas/image/' + file.filename;
		}
		const manga = await Manga.create(data);


		const result = await uploadToS3(file);
		await unlink(path.resolve(file.path));
		console.log(result);

		res.status(201).toJSON(manga);
	} catch
		(err) {
		next(err);
	}
}
;

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

exports.image = async (req, res) => {
	console.log(req.params);
	const key = req.params.key;
	const readStream = getFileStream(key);

	// '/uploads/' +

	readStream.pipe(res);
};