"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (req, _res, next) {
  var shallowReq = {
    headers: req.headers,
    get: req.get
  };

  var customGet = function customGet(key, defaultValue) {
    return shallowReq.get(key) || req.query[key] || req.params[key] || req.body[key] || defaultValue;
  };
  /**
   *
   * @param key = string | string[]
   * @param defaultValue = any | {*}
   * @returns any | {*}
   *
   **/


  req.get = function (key, defaultValue) {
    if (Array.isArray(key)) {
      return key.reduce(function (accumulator, k) {
        accumulator[k] = customGet(k, _typeof(defaultValue) === 'object' ? defaultValue[k] : defaultValue);
        return accumulator;
      }, {});
    }

    return customGet(key, defaultValue);
  };

  next();
};