"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var validateRequest = require('./validator');

var verifyToken = require('../middlewares/auth');

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$auth = _ref.auth,
      auth = _ref$auth === void 0 ? false : _ref$auth,
      _ref$beforeValidators = _ref.beforeValidators,
      beforeValidators = _ref$beforeValidators === void 0 ? [] : _ref$beforeValidators,
      _ref$rules = _ref.rules,
      rules = _ref$rules === void 0 ? [] : _ref$rules,
      _ref$afterValidators = _ref.afterValidators,
      afterValidators = _ref$afterValidators === void 0 ? [] : _ref$afterValidators,
      _ref$sanitizers = _ref.sanitizers,
      sanitizers = _ref$sanitizers === void 0 ? [] : _ref$sanitizers,
      _ref$afterSanitizers = _ref.afterSanitizers,
      afterSanitizers = _ref$afterSanitizers === void 0 ? [] : _ref$afterSanitizers;

  return [].concat(_toConsumableArray(auth ? [verifyToken] : []), _toConsumableArray(beforeValidators), _toConsumableArray(rules.concat(rules.length ? validateRequest : [])), _toConsumableArray(afterValidators), _toConsumableArray(sanitizers), _toConsumableArray(afterSanitizers));
}; // !auth || verifyToken