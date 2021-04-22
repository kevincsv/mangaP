const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
	let errors = validationResult(req);
	let status = 422;

	if (!errors.isEmpty()) {
		errors = errors.array();
		let result = {errors};

		for (let x = 0; x < errors.length; x++) {
			if (errors[ x ].msg.code) {
				status = errors[ x ].msg.code;
				result = {
					error: errors[ x ]
				};

				result.error.msg = errors[ x ].msg.message;

				break;
			}
		}

		return res.status(status).json(result);
	}

	next();
}
;
