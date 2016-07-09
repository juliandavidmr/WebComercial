'use strict';

var _db_publicidad = require('../db/db_publicidad');

var express = require('express');
var router = express.Router();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dir = '../public/';

var dialog = require('dialog');

// Register
router.get('/', function (req, res) {
	res.render(dir + 'views/publicidad/create_plan', { message: '' });
});

//Gestionar comerciante

router.get('/new_plan', function (req, res) {});

function alert(msg) {
	dialog.info(msg);
}

router.post('/new_plan', function (req, res, next) {

	var new_plan = {
		Descripcion: req.body.descripcion,
		ValorMensual: req.body.precio,
		Estado: req.body.estado,
		Puntaje: req.body.puntaje,
		NroServicios: req.body.nro_servicios,
		Space: parseInt(req.body.puntaje) * 100 / 12
	};

	new _db_publicidad.Publicidad().insertTipoPublicidad(new_plan, function (row, est) {
		if (row > 0) {
			alert("Plan de publicidad creado exitosamente");
			res.redirect(req.get('referer'));
			//res.render(dir + 'views/usuarios/register', {message: "Usuario creado exitosamente"});
		} else {
			alert("Error al crear el plan de publicidad");
			//res.render(dir + 'views/usuarios/register', {message: "Error al crear el usuario"});
		}
	});
});

router.post('/new_publicidad', function (req, res, next) {

	var new_publicidad = {
		FK_idPublicidad: req.body.plan,
		FK_idComerciante: req.body.comerciante,
		Estado: "T",
		FK_idCuenta: req.session.cuenta
	};

	new _db_publicidad.Publicidad().insertPublicidad(new_publicidad, function (row, est) {
		if (row > 0) {
			alert("Publicidad asignada exitosamente");
			res.redirect(req.get('referer'));
			//res.render(dir + 'views/usuarios/register', {message: "Usuario creado exitosamente"});
		} else {
			alert("Error al crear asignar la publicidad");
			//res.render(dir + 'views/usuarios/register', {message: "Error al crear el usuario"});
		}
	});
});

module.exports = router;