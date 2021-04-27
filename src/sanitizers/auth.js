const {check} = require('express-validator');

const User = require('../models/User');

exports.signup = [
	check('username')
		.trim(),

	check('email')
		.trim()
		.normalizeEmail()
];

exports.signin = [
	check('email')
		.trim()
		.normalizeEmail()
		.custom((value, {req}) => User.findOne({email: value}).then(user => {
			req.user = user;
		}))
];


