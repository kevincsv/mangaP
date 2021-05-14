"use strict";

var _require = require('express-validator'),
    check = _require.check;

var makeShowValidator = require('../tools/makeShowValidator');

var Manga = require('../models/Manga');

var show = makeShowValidator('manga', Manga, 'Manga');
var create = [check('title', 'title is required').notEmpty().custom(function (value) {
  return Manga.find({
    title: value
  }).then(function (manga) {
    if (manga.length) {
      return Promise.reject('Manga already exists');
    }
  });
}), check('author', 'author is required').notEmpty(), check('description', 'description is required').notEmpty()];
exports.create = create;
exports.show = show;
exports.update = show.concat(create);
exports["delete"] = show;