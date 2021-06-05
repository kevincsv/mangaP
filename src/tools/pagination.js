module.exports = (req) => {
	const limit = req.query.limit;
	const page = req.query.page;
	const sort = {createdAt: req.query.sort};

	return {limit, page, sort};
};