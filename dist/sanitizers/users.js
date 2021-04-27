"use strict";

var _require = require('express-validator'),
    check = _require.check;

var signup = [check('username').trim(), check('email').trim().normalizeEmail()];
var signin = [check('email').trim().normalizeEmail()];
exports.signup = signup;
exports.signin = signin;