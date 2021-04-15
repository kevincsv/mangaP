const {check} = require ('express-validator');
const {validationResult} = require ('express-validator');

const index = [
	check ('title', 'title is required')
		.notEmpty (),

	check ('author', 'author is required')
		.notEmpty ()
];

module.exports = index;