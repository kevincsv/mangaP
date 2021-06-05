module.exports = (Schema) => {
	Schema.pre(['save', 'update'], function (next) {
		this.updatedAt = new Date;

		next();
	});
};