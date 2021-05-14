"use strict";

var _require = require('express-validator'),
    validationResult = _require.validationResult;

module.exports = function (req, res, next) {
  var errors = validationResult(req);
  var status = 422;

  if (!errors.isEmpty()) {
    errors = errors.array();
    var result = {
      errors: errors
    };

    for (var x = 0; x < errors.length; x++) {
      if (errors[x].msg.code) {
        status = errors[x].msg.code;
        result = {
          error: errors[x]
        };
        result.error.msg = errors[x].msg.message;
        break;
      }
    }

    return res.status(status).json(result);
  }

  next();
};