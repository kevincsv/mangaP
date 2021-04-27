"use strict";

var router = require('./tools/router')();

router.get('/', function (req, res) {
  res.send('hello world!');
});
module.exports = router;