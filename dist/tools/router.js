"use strict";

var _require = require('express'),
    Router = _require.Router;

var makeMiddlewares = require('../tools/makeMiddlewares');

module.exports = function (options) {
  var router = Router(options);
  router.makeMiddlewares = makeMiddlewares;
  return router;
};