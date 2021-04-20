const apiError = require ('../tools/apiErrors');

function apiErrorHandler (err, req, res, next) {
	console.log (err); // replace for log handler to reduce lag

	if (err instanceof apiError) {
		res.status (err.code).json (err.message);
		return;
	}
	res.status (err.status || 500);
	res.json (err);

}

module.exports = apiErrorHandler;