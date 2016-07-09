'use strict';

var _db_usuario = require('../db/db_usuario');

var express = require('express');
var router = express.Router();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dir = '../public/';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var dialog = require('dialog');

// Register
router.get('/', function (req, res) {
	res.render(dir + 'views/usuarios/register', { message: '' });
});

//Opciones del usuario

router.get('/register', function (req, res) {
	var id_persona = null;
	new _db_usuario.Usuario().getIdPersona(function (datos) {
		id_persona = datos[0].last_id;
	});
});

function alert(msg) {
	dialog.info(msg);
}

router.post('/register', function (req, res, next) {
	var id = 0;
	new _db_usuario.Usuario().getIdPersona(function (datos) {
		console.log("Datos: " + datos[0].last_id);
		id = parseInt(datos[0].last_id);
		console.log("id_persona: " + id);

		var new_persona = {
			idPersona: id + 1,
			Identificacion: req.body.identificacion,
			Nombres: req.body.nombres,
			Apellidos: req.body.apellidos,
			Direccion: req.body.direccion,
			Correo: req.body.correo,
			FK_idCiudad: req.body.ciudad

		};

		var new_user = {
			Username: req.body.correo,
			password: req.body.identificacion,
			Estado: 'T',
			FK_idRol: req.body.rol,
			FK_idPersona: id + 1
		};
		console.log("Persona: " + new_persona + ", User: " + new_user);
		new _db_usuario.Usuario().insertPersona(new_persona, function (row_persona, est_persona) {
			if (row_persona > 0) {
				new _db_usuario.Usuario().insertUsuario(new_user, function (row_user, est_user) {
					if (row_user > 0) {
						alert("Usuario creado exitosamente");
						res.redirect(req.get('referer'));
						//res.render(dir + 'views/usuarios/register', {message: "Usuario creado exitosamente"});
					} else {
						alert("Error al crear el usuario");
						//res.render(dir + 'views/usuarios/register', {message: "Error al crear el usuario"});
					}
				});
			} else {
				alert("Error al crear el usuario");
				//res.render(dir + 'views/usuarios/register', {message: "Error al crear el usuario"});
			}
		});
	});
});

module.exports = router;