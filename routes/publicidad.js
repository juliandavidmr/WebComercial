const express = require('express');
const router = express.Router();

const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
const dir = '../public/';

import { Publicidad } from "../db/db_publicidad";

var dialog = require('dialog');

// Register
router.get('/', function(req, res) {
	res.render(dir + 'views/publicidad/create_plan', {message: ''});
});

//Gestionar comerciante

router.get('/new_plan', function(req, res) {

	});

  function alert(msg){
    dialog.info(msg);
  }

router.post('/new_plan', function(req, res, next) {

	var new_plan = {
		Descripcion: req.body.descripcion,
		ValorMensual: req.body.precio,
		Estado: req.body.estado,
		Puntaje: req.body.puntaje,
    NroServicios: req.body.nro_servicios
	}

	new Publicidad().insertTipoPublicidad(new_plan, function(row, est) {
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

module.exports = router;
