const validateRequest = require('./validator');
const verifyToken = require('../middlewares/verifyToken');

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
		// importante, auto validación <3
		...(rules.concat(rules.length ? validateRequest : [])),
		...afterValidators,
		...sanitizers,
		...afterSanitizers
	];
};

// !auth || verifyToken