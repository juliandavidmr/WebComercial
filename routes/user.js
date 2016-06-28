const express = require('express');
const router = express.Router();

const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
//const db_u = require('../db/db_usuario');
const dir = '../public/';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import { Usuario } from "../db/db_usuario";



// Register
router.get('/', function(req, res) {
	res.render(dir + 'views/usuarios/register');
});

//Opciones del usuario

router.get('/register', function(req, res) {
	var id_persona=null;
	new Usuario().getIdPersona(function(datos) {
		console.log("Datos: " +datos[0].last_id);
		id_persona = datos[0].idPersona;
		console.log("ID2: " + id_persona);
	});
	console.log("ID1: " + id_persona);
	});

router.post('/register', function(req, res, next) {
	new Usuario().getIdPersona(function(datos) {
		var id = datos[0].idPersona;

	console.log("id: " + id+1);

	var new_persona = {
		idPersona: id+1,
		Identificacion: req.body.identificacion,
		Nombres: req.body.nombres,
		Apellidos: req.body.apellidos,
		Direccion: req.body.direccion,
		Correo:req.body.correo,
		FK_idCiudad:1

	}

	var new_user = {
		Username: "admin",
		password: "admin098",
		Estado: 'T',
		FK_idRol: '1',
		FK_idPersona: id+1
	}
	console.log("Persona: " + new_persona +", User: " + new_user);
	new Usuario().insertPersona(new_persona, function(row_persona, est_persona) {
		if (row_persona > 0) {
			new Usuario().insertUsuario(new_user, function(row_user, est_user) {
				if (row_user > 0) {
					alert("Usuario registrado exitosamente");
				} else {
					res.send('No se registró el usuario');
				}
			});
		} else {
			res.send('No se registró la persona');
		}
	});
});
});

module.exports = router;
