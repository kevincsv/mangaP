"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var User = require('../models/User'); // *******************   SIGNUP   ******************* \\


exports.signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, username, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
            user = new User({
              username: username,
              email: email,
              password: password
            });
            _context.next = 5;
            return user.encryptPassword(user.password);

          case 5:
            user.password = _context.sent;
            _context.next = 8;
            return user.save();

          case 8:
            token = jwt.sign({
              id: user._id
            }, process.env.SECRET, {
              expiresIn: process.env.JWT_TTL
            });
            res.json({
              Registered: [{
                auth: true,
                token: token
              }]
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // *******************   SHOW   ******************* \\


exports.show = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return User.findById(req.userId, {
              password: 0
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json('User not found'));

          case 6:
            res.json(user);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}(); // *******************   SIGNING   ******************* \\


exports.signin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var _req$body2, email, password, user, validPassword, token;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context3.next = 4;
            return User.findOne({
              email: email
            });

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              errors: {
                value: email,
                msg: 'The email doesn\'t exists',
                param: 'email',
                location: 'body'
              }
            }));

          case 7:
            _context3.next = 9;
            return user.validatePassword(password);

          case 9:
            validPassword = _context3.sent;

            if (validPassword) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              errors: [{
                auth: false,
                msg: 'Password is incorrect',
                param: 'password',
                location: 'body',
                token: null
              }]
            }));

          case 12:
            token = jwt.sign({
              id: user._id
            }, process.env.SECRET, {
              expiresIn: process.env.JWT_TTL
            });
            res.json({
              'logged in': {
                token: token
              }
            });
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 16]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();