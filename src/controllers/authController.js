const jwt = require('jsonwebtoken');

const User = require('../models/User');

const getToken = (userId) =>
	jwt.sign({id: userId}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_TTL
	});

// *******************   SIGNUP   ******************* \\
exports.signup = async (req, res, next) => {
	try {
		const data = req.get(['username', 'email', 'password']);
		const user = await User.create(data);


		res.status(201).toJSON(user, {
			included: {
				token: getToken(user._id)
			}
		});
	} catch (err) {
		next(err);
	}
};

// *******************   SHOW   ******************* \\
exports.show = async (req, res, next) => {
	try {
		res.toJSON(req.user);
	} catch (err) {
		next(err);
	}
};


// *******************   SIGNING   ******************* \\
exports.signin = async (req, res, next) => {
	try {
		const user = req.user;

		res.toJSON(user, {
			included: {
				token: getToken(user._id)
			}
		});
	} catch (err) {
		next(err);
	}
};