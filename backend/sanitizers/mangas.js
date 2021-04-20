const {check} = require ('express-validator');
const Manga = require ('../models/Manga');

const show = [
	check ('manga').customSanitizer (value => Manga.findById (value))
];

const create = [
	check ('title').trim (),

	check ('author').trim (),

	check ('description').trim ()
];

exports.create = create;

exports.show = show;

exports.update = show.concat (create);

exports.delete = show;