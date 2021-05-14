"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var makeModelToJson = require('../tools/makeModelToJson');

var makeModelUpdateAt = require('../tools/makeModelUpdateAt');

var MangaSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imagePath: {
    type: String
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
makeModelToJson({
  schema: MangaSchema
});
makeModelUpdateAt(MangaSchema);
module.exports = model('Manga', MangaSchema);