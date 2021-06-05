const pagination = require('../tools/pagination');

module.exports = (req, _res, next) => {
	req.pagination = () => pagination(req);

	next();
};



