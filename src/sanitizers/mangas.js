const {body, param} = require('express-validator');

const Manga = require('../models/Manga');

const show = [
	param('manga').customSanitizer(value => Manga.findById(value))
];

const create = [
	body('title').trim(),

	body('author').trim(),

	body('description').trim()
];

exports.create = create;

exports.show = show;

exports.update = show.concat(create);

exports.delete = show;