const validateRequest = require('./validator');
const verifyToken = require('../middlewares/auth');

module.exports = ({
	                  auth = false,
	                  beforeValidators = [],
	                  rules = [],
	                  afterValidators = [],
	                  sanitizers = [],
	                  afterSanitizers = []
                  } = {}) => {
	return [
		...(auth ? [verifyToken] : []),
		...beforeValidators,
		...(rules.concat(rules.length ? validateRequest : [])),
		...afterValidators,
		...sanitizers,
		...afterSanitizers
	];
};