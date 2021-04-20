const {check} = require ('express-validator');
const {validationResult} = require ('express-validator');

exports.mangas = [
	check ('title', 'title is required')
		.notEmpty (),

	check ('author', 'author is required')
		.notEmpty ()
];

exports.show = [
	check ('id', 'Id not valid, try using a valid ID')
		.isMongoId ()
];