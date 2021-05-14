"use strict";

// *******************   REQUIREMENTS   ******************* \\
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var mongoose = require('mongoose');

var morgan = require('morgan');

var multer = require('multer');

var path = require('path');

var makeReqGet = require('./tools/makeReqGet');

var makeResToJSON = require('./tools/makeResToJSON');

var apiErrorHandler = require('./middlewares/apiErrorHandler');

require('./database'); // *******************   INITIALIZATIONS   ******************* \\


mongoose.set('returnOriginal', false);
var app = express();
app.use(makeReqGet);
app.use(makeResToJSON); // *******************   SERVER SETTINGS   ******************* \\

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2); // *******************   MIDDLEWARES   ******************* \\

app.use(morgan('dev'));
var storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage
}).single('image'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); // *******************   STATIC FILES  ******************* \\

app.use(express["static"](path.join(__dirname, 'public'))); // *******************   SERVER ROUTES   ******************* \\

app.use('/mangas', require('./routes/mangas'));
app.use('/users', require('./routes/auth'));
app.use('/', require('./routes/redirections')); // *******************   404 ERROR HANDLER    ******************* \\

app.use(function (_req, res) {
  res.status(404).json({
    error: 'Unable to process your request!'
  });
}); // *******************   ERROR HANDLER    ******************* \\

app.use(apiErrorHandler); // *******************   LOG FOR SERVER STARTING   ******************* \\

app.listen(app.get('port'), function () {
  console.log("Server on port ".concat(app.get('port')));
});