"use strict";

var router = require('../tools/router')();

var rules = require('../rules/auth');

var sanitizers = require('../sanitizers/auth');

var controller = require('../controllers/authController');

router // *******************   SIGNUP   ******************* \\
.post('/signup', router.makeMiddlewares({
  rules: rules.signup,
  sanitizer: sanitizers.signup
}), controller.signup) // *******************   SHOW   ******************* \\
.get('/me', router.makeMiddlewares({
  auth: true
}), controller.show) // *******************   SIGNING   ******************* \\
.post('/signing', router.makeMiddlewares({
  rules: rules.signin,
  sanitizer: sanitizers.signin
}), controller.signin);
module.exports = router;