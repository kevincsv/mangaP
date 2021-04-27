"use strict";

var _require = require('express-validator'),
    check = _require.check;

module.exports = function (field, Model, name) {
  name = name || field;
  var message = "The ".concat(name, " doesn't exists");
  return [check(field, {
    message: message,
    code: 400
  }).isMongoId().exists({
    checkFalsy: true
  }), check(field).custom(function (value) {
    return Model.findById(value).then(function (manga) {
      if (!manga) {
        return Promise.reject({
          message: message,
          code: 404
        });
      }
    });
  })];
};