const {check} = require('express-validator');

const signup = [
	check('username')
		.trim(),

	check('email')
		.trim()
		.normalizeEmail()
];

const signin = [
	check('email')
		.trim()
		.normalizeEmail()
];


exports.signup = signup;

exports.signin = signin;


