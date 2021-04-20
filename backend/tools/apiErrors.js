class apiError {
	constructor (code, message) {
		this.code = code;
		this.message = message;
	}

	static BadRequest (message) {
		return new apiError (400, message);
	}

	static internalServerError (message) {
		return new apiError (500, message);
	}
}

module.exports = apiError;