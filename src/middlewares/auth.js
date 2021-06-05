const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function auth(req, res, next) {
	try {
		const token = req.headers[ 'x-access-token' ];
		if (!token) {
			throw {status: 401, message: 'No token provided'};
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);
		if (!user) {
			throw {status: 401, message: 'Invalid token'};
		}

		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = auth;



