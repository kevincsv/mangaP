"use strict";

var router = require('../tools/router')();

var rules = require('../rules/mangas');

var sanitizers = require('../sanitizers/mangas');

var controller = require('../controllers/mangaController');

router // *******************   CRUD (INDEX)   ******************* \\
.get('/mangas', router.makeMiddlewares({
  auth: true
}), controller.index) // *******************   CRUD (SHOW)   ******************* \\
.get('/:manga', router.makeMiddlewares({
  auth: true,
  rules: rules.show,
  sanitizers: sanitizers.show
}), controller.show) // *******************   CRUD (CREATE)   ******************* \\
.post('/', router.makeMiddlewares({
  auth: true,
  rules: rules.create,
  sanitizers: sanitizers.create
}), controller.create) // *******************   CRUD (UPDATE)   ******************* \\
.put('/:manga', router.makeMiddlewares({
  auth: true,
  rules: rules.update,
  sanitizers: sanitizers.update
}), controller.update) // *******************   CRUD (DELETE)   ******************* \\
["delete"]('/:manga', router.makeMiddlewares({
  auth: true,
  rules: rules["delete"],
  sanitizers: sanitizers["delete"]
}), controller["delete"]);
module.exports = router;