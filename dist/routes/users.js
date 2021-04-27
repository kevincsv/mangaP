"use strict";

var router = require('../tools/router')();

var rules = require('../rules/users');

var sanitizers = require('../sanitizers/users');

var controller = require('../controllers/userController');

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