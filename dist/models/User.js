"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var bcrypt = require('bcryptjs');

var makeModelToJson = require('../tools/makeModelToJson');

var makeModelUpdateAt = require('../tools/makeModelUpdateAt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});

UserSchema.methods.encryptPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.genSalt(8);

          case 2:
            salt = _context.sent;
            return _context.abrupt("return", bcrypt.hash(password, salt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

makeModelToJson({
  schema: UserSchema,
  hide: ['password']
});
makeModelUpdateAt(UserSchema);
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!Number.isNaN(bcrypt.getRounds(this.password))) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return this.encryptPassword(this.password);

          case 3:
            this.password = _context2.sent;

          case 4:
            next();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = model('User', UserSchema);