const {body} = require('express-validator');
const makeShowValidator = require('../tools/makeShowValidator');
const Manga = require('../models/Manga');

const show = makeShowValidator('manga', Manga, 'Manga');

const create = [
	body('title', 'title is required')
		.notEmpty()

		.custom((value) => Manga.find({title: value}).then(manga => {
			if (manga.length) {
				return Promise.reject('Manga already exists');
			}
		})),

	body('author', 'author is required')
		.notEmpty(),

	body('description', 'description is required')
		.notEmpty()
];

exports.create = create;

exports.show = show;

exports.update = show.concat(create);

exports.delete = show;