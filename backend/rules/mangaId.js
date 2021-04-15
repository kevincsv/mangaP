const {check} = require ('express-validator');
const {validationResult} = require ('express-validator');

const index = [
	check ('id', 'Id not valid, try using a valid ID')
		.isMongoId (), (req, res, next) => {
		const errors = validationResult (req);
		if (!errors.isEmpty ()) {
			return res.status (422).json ({errors: errors.array ()});
		}
		next ();

	}
];
module.exports = index;