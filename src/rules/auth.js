const {check} = require('express-validator');

const User = require('../models/User');

// *******************   SIGNUP   ******************* \\
exports.signup = [
	check('username', 'Username is required and can not be blank')
		.notEmpty()

		.custom((value) => User.findOne({username: value}).then(user => {
			if (user) {
				return Promise.reject('Username already in use');
			}
		})),

	check('email', 'Email must be valid and can not be blank')
		.isEmail()

		.custom((value) => User.findOne({email: value}).then(user => {
			if (user) {
				return Promise.reject('E-mail already in use');
			}
		})),

	check('password', 'Password is required and must be  alphanumeric only')
		.isAlphanumeric(),

	check('confirmPassword')
		.isAlphanumeric()

		.custom((value, {req}) => {
			if (value !== req.get('password')) {
				throw new Error('Password confirmation does not match password');
			}
			return true;
		})
];


// *******************   SIGNING   ******************* \\
exports.signin = [
	check('email', 'Email must be valid and can not be blank')
		.isEmail(),

	check('password', 'Password is required and must be alphanumeric only')
		.isAlphanumeric()

		.notEmpty()

		.custom((value, {req}) => User.findOne({email: req.get('email')}).then(async user => {
			const rejection = {
				message: 'Credentials not found',
				code: 401
			};

			if (!user) {
				return Promise.reject(rejection);
			}

			const validPassword = await user.validatePassword(req.get('password'));
			if (!validPassword) {
				return Promise.reject(rejection);
			}
		}))
];