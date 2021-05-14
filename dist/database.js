"use strict";

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB is now connected');
})["catch"](function (err) {
  return console.error(err);
});