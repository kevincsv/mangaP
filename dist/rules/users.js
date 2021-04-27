"use strict";

var _require = require('express-validator'),
    check = _require.check;

var User = require('../models/User'); // *******************   SIGNUP   ******************* \\


exports.signup = [check('username', 'Username is required and can not be blank').notEmpty().custom(function (value) {
  return User.find({
    username: value
  }).then(function (user) {
    if (user.length) {
      return Promise.reject('Username already in use');
    }
  });
}), check('email', 'Email must be valid and can not be blank').isEmail().custom(function (value) {
  return User.find({
    email: value
  }).then(function (user) {
    if (user.length) {
      return Promise.reject('E-mail already in use');
    }
  });
}), check('password', 'Password is required and must be  alphanumeric only').isAlphanumeric()]; // *******************   SIGNING   ******************* \\

exports.signin = [check('email', 'Email must be valid and can not be blank').isEmail(), check('password', 'Password is required and must be alphanumeric only').isAlphanumeric().notEmpty()];