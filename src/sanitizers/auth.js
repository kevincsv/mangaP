const {body} = require('express-validator');

const User = require('../models/User');

exports.signup = [
	body('username')
		.trim(),

	body('email')
		.trim()
		.normalizeEmail()
];

exports.signin = [
	body('email')
		.trim()
		.normalizeEmail()
		.customSanitizer((value, {req}) => User.findOne({email: value}).then(user => {
			req.user = user;
		}))
];


