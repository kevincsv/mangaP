"use strict";

var _require = require('express-validator'),
    check = _require.check;

var Manga = require('../models/Manga');

var show = [check('manga').customSanitizer(function (value) {
  return Manga.findById(value);
})];
var create = [check('title').trim(), check('author').trim(), check('description').trim()];
exports.create = create;
exports.show = show;
exports.update = show.concat(create);
exports["delete"] = show;