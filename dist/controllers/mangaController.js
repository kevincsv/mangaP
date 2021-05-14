"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Manga = require('../models/Manga');

var algoliasearch = require('algoliasearch');

var client = algoliasearch(process.env.ALG_APP_ID, process.env.ALG_ADMIN);
var index = client.initIndex(process.env.ALG_DEV_INDEX); // *******************   CRUD (Index)   ******************* \\

exports.index = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var filter, $search, searchResult, mangas;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            filter = {};
            $search = req.get('search');

            if (!$search) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return index.search($search, {
              attributesToRetrieve: ['objectID'],
              attributesToHighlight: [0]
            }, '').then(function (_ref2) {
              var hits = _ref2.hits;
              return hits.map(function (_ref3) {
                var objectID = _ref3.objectID;
                return objectID;
              });
            });

          case 6:
            searchResult = _context.sent;
            filter = {
              _id: {
                $in: searchResult
              }
            };

          case 8:
            _context.next = 10;
            return Manga.find(filter);

          case 10:
            mangas = _context.sent;
            res.toJSON(mangas);
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // *******************   CRUD (Show)   ******************* \\


exports.show = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.toJSON(req.get('manga'));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}(); // *******************   CRUD (Create)   ******************* \\


exports.create = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var data, manga, objects;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.get(['title', 'author', 'description']);
            _context3.next = 4;
            return Manga.create(data);

          case 4:
            manga = _context3.sent;
            objects = [{
              title: manga.title,
              author: manga.author,
              objectID: manga._id
            }];
            _context3.next = 8;
            return index.saveObjects(objects);

          case 8:
            res.status(201).toJSON(manga);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function (_x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}(); // *******************   CRUD (Update)   ******************* \\


exports.update = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var data, manga, objects;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            data = req.get(['title', 'author', 'description']);
            manga = req.get('manga');
            Object.assign(manga, data);
            _context4.next = 6;
            return manga.save();

          case 6:
            objects = [{
              title: manga.title,
              author: manga.author,
              objectID: manga._id
            }];
            _context4.next = 9;
            return index.saveObjects(objects);

          case 9:
            res.toJSON(manga);
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function (_x9, _x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}(); // *******************   CRUD (Delete)   ******************* \\


exports["delete"] = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var manga, mangaID;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            manga = req.get('manga');
            console.log(manga._id);
            mangaID = manga._id;
            index.deleteObject(mangaID).then(function () {// done
            });
            _context5.next = 7;
            return manga["delete"]();

          case 7:
            res.status(204).json();
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function (_x12, _x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();