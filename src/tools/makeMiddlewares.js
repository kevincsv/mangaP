const validateRequest = require('./validator');
const verifyToken = require('../middlewares/auth');

const paginationRules = require('../rules/pagination');

const paginationSanitizer = require('../sanitizers/pagination');

const paginationMiddleware = require('../middlewares/pagination');

module.exports = ({
	                  auth = false,
	                  pageable = false,
	                  beforeValidators = [],
	                  rules = [],
	                  afterValidators = [],
	                  sanitizers = [],
	                  afterSanitizers = []
                  } = {}) => {
	return [
		...(auth ? [verifyToken] : []),
		...beforeValidators,
		...(rules.concat(pageable ? paginationRules : [], rules.length ? validateRequest : [])),
		...afterValidators,
		...(sanitizers.concat(pageable ? paginationSanitizer : [])),
		...(afterSanitizers.concat(pageable ? paginationMiddleware : []))
	];
};