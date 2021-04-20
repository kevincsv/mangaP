const {check} = require ('express-validator');
const makeShowValidator = require ('../tools/makeShowValidator');
const Manga = require ('../models/Manga');

const show = makeShowValidator ('manga', Manga, 'Manga');

const create = [
	check ('title', 'title is required')
		.notEmpty (),

	check ('author', 'author is required')
		.notEmpty (),

	check ('description', 'description is required')
		.notEmpty ()
];

exports.create = create;

exports.show = show;

exports.update = show.concat (create);

exports.delete = show;