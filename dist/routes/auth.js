"use strict";

var router = require('../tools/router')();

var rules = require('../rules/auth');

var sanitizers = require('../sanitizers/auth');

var controller = require('../controllers/authController');

router // *******************   SIGNUP   ******************* \\
.post('/signup', router.makeMiddlewares({
  rules: rules.signup,
  sanitizers: sanitizers.signup
}), controller.signup) // *******************   SHOW   ******************* \\
.get('/me', router.makeMiddlewares({
  auth: true
}), controller.show) // *******************   SIGNING   ******************* \\
.post('/signin', router.makeMiddlewares({
  rules: rules.signin,
  sanitizers: sanitizers.signin
}), controller.signin);
module.exports = router;