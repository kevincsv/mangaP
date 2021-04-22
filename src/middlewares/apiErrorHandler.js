// const MongooseError = require ('mongoose/lib/error');

module.exports = (err, req, res, next) => {
	// console.log (123, typeof err, err instanceof MongooseError);
	console.log(err);

	res.status(err.status || 500).json({
		error: {
			msg: err.message || 'Something went wrong'
		}
	});
};
