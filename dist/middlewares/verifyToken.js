"use strict";

var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      msg: 'No token provided'
    });
  }

  var decoded = jwt.verify(token, process.env.SECRET);
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;