const {check, query} = require('express-validator');
const makeShowValidator = require('../tools/makeShowValidator');
const Manga = require('../models/Manga');

const show = makeShowValidator('manga', Manga, 'Manga');

const pagination = [
	query('sort', 'The sort value must be 1, -1, asc, desc, ascending or descending, by default it will always be ascending,')
		.optional({
			checkFalsy: true
		})
		.isIn(['asc', 'desc', 'ascending', 'descending']),

	query('page', 'The Page only accept integer numbers as value and can not be set to 0')
		.optional({
			checkFalsy: true
		})
		.isInt({min: 1}),

	query('limit', 'The Limit only accept integer numbers as value and can not be set to 0')
		.optional({
			checkFalsy: true
		})
		.isInt({min: 1})

];

const create = [
	// check('title', 'title is required')
	// 	.notEmpty()
	//
	// 	.custom((value) => Manga.find({title: value}).then(manga => {
	// 		if (manga.length) {
	// 			return Promise.reject('Manga already exists');
	// 		}
	//
	// 	})),
	//
	// check('author', 'author is required')
	// 	.notEmpty(),
	//
	// check('description', 'description is required')
	// 	.notEmpty()
];

exports.create = create;

exports.show = show;

exports.update = show.concat(create);

exports.delete = show;

exports.pagination = pagination;