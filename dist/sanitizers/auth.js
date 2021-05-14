"use strict";

var _require = require('express-validator'),
    check = _require.check;

var User = require('../models/User');

exports.signup = [check('username').trim(), check('email').trim().normalizeEmail()];
exports.signin = [check('email').trim().normalizeEmail().custom(function (value, _ref) {
  var req = _ref.req;
  return User.findOne({
    email: value
  }).then(function (user) {
    req.user = user;
  });
})];