const {merge} = require('lodash');

const getMeta = (model) => {
	const {totalDocs, limit, totalPages, page, pagingCounter} = model;

	return {
		totalDocs,
		limit,
		totalPages,
		page,
		pagingCounter
	};
};

const getLinks = (model) => {
	const {hasPrevPage, hasNextPage, prevPage, nextPage} = model;

	return {
		hasPrevPage,
		hasNextPage,
		prevPage,
		nextPage
	};
};


const getExtra = (model, extra) => {
	if (model.docs) {
		merge(extra, {meta: getMeta(model), links: getLinks(model)});
	}

	return extra;
};

const getData = (model) => {
	if (model.docs) {
		return model.docs.map((m) => m.toJSON());
	}

	if (Array.isArray(model)) {
		return model.map((m) => m.toJSON());
	}

	return model.toJSON();
};

module.exports = (_req, res, next) => {
	res.toJSON = (model, extra = {}) => res.json({
		data: getData(model),
		...getExtra(model, extra)
	});

	next();
};