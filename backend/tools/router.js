const {Router} = require ('express');
const makeMiddlewares = require ('../tools/makeMiddlewares');
module.exports = (options) => {
	const router = Router (options);
	router.makeMiddlewares = makeMiddlewares;
	return router;
};
