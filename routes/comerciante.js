const express = require('express');
const router = express.Router();

const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
const dir = '../public/';

import { Comerciante } from "../db/db_comerciante";

var dialog = require('dialog');

// Register
router.get('/', function(req, res) {
	res.render(dir + 'views/comerciantes/create', {message: ''});
});

//Gestionar comerciante

router.get('/register', function(req, res) {

	});

  function alert(msg){
    dialog.info(msg);
  }

router.post('/register', function(req, res, next) {

	var new_comerciante = {
		Nombre: req.body.nombre,
		Descripcion: req.body.descripcion,
		Correo: req.body.correo,
		PaginaWeb: req.body.pagina_web,
    Telefono: req.body.telefono,
		Direccion: req.body.direccion,
		Latitud: req.body.latitud,
		Longitud: req.body.longitud
	}

	new Comerciante().insertComerciante(new_comerciante, function(row, est) {
		if (row > 0) {
          alert("Comerciante creado exitosamente");
          res.redirect(req.get('referer'));
          //res.render(dir + 'views/usuarios/register', {message: "Usuario creado exitosamente"});
		} else {
      alert("Error al crear el comerciante");
			//res.render(dir + 'views/usuarios/register', {message: "Error al crear el usuario"});
		}
	});
});

module.exports = router;
