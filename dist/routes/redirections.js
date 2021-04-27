"use strict";

var router = require('../tools/router')();

router.get('/', router.makeMiddlewares({
  auth: true
}), function (req, res) {
  res.redirect('/mangas');
});
module.exports = router;