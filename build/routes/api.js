'use strict';

var _db_usuario = require('../db/db_usuario');

var _db_menu = require('../db/db_menu');

var _db_comerciante = require('../db/db_comerciante');

var _db_publicidad = require('../db/db_publicidad');

var _db_servicios = require('../db/db_servicios');

var _db_lugar = require('../db/db_lugar');

var _db_categorias = require('../db/db_categorias');

var express = require('express');
var router = express.Router();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dir = '../public/';

var dialog = require('dialog');

//Opciones del usuario

router.get('/allComerciantes', function (req, res) {
  new _db_comerciante.Comerciante().getAllComerciantes(function (datos) {
    res.json(datos);
  });
});

router.get('/allServicios', function (req, res) {
  new _db_servicios.Servicio().getAllServicios(function (datos) {
    res.json(datos);
  });
});

router.get('/allPlanes', function (req, res) {
  new _db_publicidad.Publicidad().getAllTipoPublicidad(function (datos) {
    res.json(datos);
  });
});

router.get('/allDptos', function (req, res) {
  new _db_lugar.Lugar().getAllDptos(function (datos) {
    res.json(datos);
  });
});

router.get('/Ciudades/:idDpto', function (req, res) {
  var idDpto = req.params['idDpto'];
  new _db_lugar.Lugar().getCiudadByDpto(idDpto, function (datos) {
    res.json(datos);
  });
});

router.get('/allCiudades', function (req, res) {
  new _db_lugar.Lugar().getAllCiudades(function (datos) {
    res.json(datos);
  });
});

router.get('/allRoles', function (req, res) {
  new _db_usuario.Usuario().getRoles(function (datos) {
    res.json(datos);
  });
});

router.get('/allCategorias', function (req, res) {
  new _db_categorias.Categoria().getAllCategorias(function (datos) {
    res.json(datos);
  });
});

router.get('/Comerciantes/:idCat', function (req, res) {
  var idCat = req.params['idCat'];

  new _db_comerciante.Comerciante().getComercianteByCategoria(idCat, function (com) {
    var data = {
      datos: com
    };
    res.json(data);
  });
});

router.get('/Subcategorias/:idCat', function (req, res) {
  var idCat = req.params['idCat'];
  new _db_categorias.Categoria().getSubcategoriasByCategoria(idCat, function (com) {
    var data = {
      datos: com
    };
    res.json(data);
  });
});

module.exports = router;