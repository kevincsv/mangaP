module.exports = (schema) => {
	schema.pre(['save', 'update'], function (next) {
		this.updatedAt = new Date;

		next();
	});
};