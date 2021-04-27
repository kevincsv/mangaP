"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var User = require('../models/User');

function auth(_x, _x2, _x3) {
  return _auth.apply(this, arguments);
}

function _auth() {
  _auth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['x-access-token'];

            if (token) {
              _context.next = 3;
              break;
            }

            throw {
              status: 401,
              message: 'No token provided'
            };

          case 3:
            decoded = jwt.verify(token, process.env.SECRET);
            _context.next = 6;
            return User.findById(decoded.id);

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            throw {
              status: 401,
              message: 'Invalid token'
            };

          case 9:
            req.user = user;
            next();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _auth.apply(this, arguments);
}

module.exports = auth;