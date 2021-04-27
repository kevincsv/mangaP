module.exports = (_req, res, next) => {
	res.toJSON = (model, extra = {}) => res.json({
		...extra,
		data: Array.isArray(model) ? model.map((m) => m.toJSON()) : model.toJSON()
	});

	next();
};