const {query} = require('express-validator');

module.exports = [
	query('sort')
		.trim()
		.default('asc'),

	query('page')
		.toInt(10)
		.default(1),

	query('limit')
		.toInt(10)
		.default(10)
];