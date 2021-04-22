const jwt = require('jsonwebtoken');

const User = require('../models/User');

// *******************   SIGNUP   ******************* \\
exports.signup = async (req, res, next) => {
	try {

		const {username, email, password} = req.body;
		const user = new User({
			username,
			email,
			password
		});

		user.password = await user.encryptPassword(user.password);
		await user.save();

		const token = jwt.sign({id: user._id}, process.env.SECRET, {
			expiresIn: process.env.JWT_TTL
		});

		res.json({
			Registered: [{
				auth: true,
				token
			}]
		});
	} catch (err) {
		next(err);
	}
};

// *******************   SHOW   ******************* \\
exports.show = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId, {password: 0});
		if (!user) {
			return res.status(404).json('User not found');
		}

		res.json(user);

	} catch (err) {
		next(err);
	}
};


// *******************   SIGNING   ******************* \\
exports.signin = async (req, res, next) => {
	try {
		const {email, password} = req.body;

		const user = await User.findOne({email: email});
		if (!user) {
			// next (apiError.notFound ('The email doesn't exists')); CAMBIAR
			return res.status(404).json({
				errors: {
					value: email,
					msg: 'The email doesn\'t exists',
					param: 'email',
					location: 'body'
				}
			});
		}

		const validPassword = await user.validatePassword(password);
		if (!validPassword) {
			return res.status(401).json({
				errors: [{
					auth: false,
					msg: 'Password is incorrect',
					param: 'password',
					location: 'body',
					token: null
				}]
			});
		}

		const token = jwt.sign({id: user._id}, process.env.SECRET, {
			expiresIn: process.env.JWT_TTL
		});
		res.json({
			'logged in': {
				token
			}
		});

	} catch (err) {
		next(err);
	}
};