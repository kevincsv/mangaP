"use strict";

module.exports = function (schema) {
  schema.pre(['save', 'update'], function (next) {
    this.updatedAt = new Date();
    next();
  });
};