const {check} = require('express-validator');

module.exports = (field, Model, name) => {
	name = name || field;
	const message = `The ${name} doesn't exists`;

	return [
		check(field, {
			message,
			code: 400
		})
			.isMongoId()
			.exists({checkFalsy: true}),

		check(field)
			.custom(value =>
				Model.findById(value)
					.then(manga => {
							if (!manga) {
								return Promise.reject({
									message,
									code: 404
								});
							}
						}
					))
	];
};