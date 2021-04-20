const jwt = require ('jsonwebtoken');

function verifyToken (req, res, next) {
	const token = req.headers[ 'x-access-token' ];
	if (!token) {
		return res.status (401).json ({
			msg: 'No token provided'
		});
	}

	const decoded = jwt.verify (token, process.env.SECRET);
	req.userId = decoded.id;
	next ();
}

module.exports = verifyToken;

