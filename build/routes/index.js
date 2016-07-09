"use strict";

var _db_menu = require("../db/db_menu");

var _db_comerciante = require("../db/db_comerciante");

var _db_categorias = require("../db/db_categorias");

var express = require('express');
var router = express.Router();

var dir = '../public/';

router.get('/', function (req, res) {
  res.render(dir + '/views/index', { title: 'Express' });
});

router.get('/consultas', function (req, res) {
  var d = {
    idCat: 0,
    datos: null
  };
  res.render(dir + 'views/consultas', { data: d });
});

router.get('/empresa', function (req, res) {
  res.render(dir + 'views/empresa');
});

router.get('/consultas/:id', function (req, res) {
  var id = req.params.id;

  new _db_categorias.Categoria().getSubcategoriasByCategoria(id, function (row, est) {
    var d = {
      datos: row,
      idCat: id
    };
    res.render(dir + 'views/consultas', { data: d });
  });
});

module.exports = router;