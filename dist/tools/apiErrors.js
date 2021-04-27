"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var router = require('../tools/router');

var apiError = /*#__PURE__*/function () {
  function apiError(code, message) {
    _classCallCheck(this, apiError);

    this.code = code;
    this.message = message;
  }

  _createClass(apiError, null, [{
    key: "badRequest",
    value: function badRequest(message) {
      return new apiError(400, message);
    }
  }, {
    key: "internalServerError",
    value: function internalServerError(message) {
      return new apiError(500, message);
    }
  }, {
    key: "notFound",
    value: function notFound(message) {
      return new apiError(404, message);
    }
  }]);

  return apiError;
}();

module.exports = apiError;