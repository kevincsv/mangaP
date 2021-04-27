"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('express-validator'),
    check = _require.check;

var User = require('../models/User'); // *******************   SIGNUP   ******************* \\


exports.signup = [check('username', 'Username is required and can not be blank').notEmpty().custom(function (value) {
  return User.findOne({
    username: value
  }).then(function (user) {
    if (user) {
      return Promise.reject('Username already in use');
    }
  });
}), check('email', 'Email must be valid and can not be blank').isEmail().custom(function (value) {
  return User.findOne({
    email: value
  }).then(function (user) {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  });
}), check('password', 'Password is required and must be  alphanumeric only').isAlphanumeric(), check('confirmPassword').isAlphanumeric().custom(function (value, _ref) {
  var req = _ref.req;

  if (value !== req.get('password')) {
    throw new Error('Password confirmation does not match password');
  }

  return true;
})]; // *******************   SIGNING   ******************* \\

exports.signin = [check('email', 'Email must be valid and can not be blank').isEmail(), check('password', 'Password is required and must be alphanumeric only').isAlphanumeric().notEmpty().custom(function (value, _ref2) {
  var req = _ref2.req;
  return User.findOne({
    email: req.get('email')
  }).then( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
      var rejection, validPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rejection = {
                message: 'Credentials not found',
                code: 401
              };

              if (user) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", Promise.reject(rejection));

            case 3:
              _context.next = 5;
              return user.validatePassword(req.get('password'));

            case 5:
              validPassword = _context.sent;

              if (validPassword) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", Promise.reject(rejection));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
})];