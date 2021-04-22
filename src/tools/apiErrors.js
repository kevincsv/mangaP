const router = require('../tools/router');


class apiError {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	static badRequest(message) {
		return new apiError(400, message);
	}

	static internalServerError(message) {
		return new apiError(500, message);
	}

	static notFound(message) {
		return new apiError(404, message);
	}
}

module.exports = apiError;