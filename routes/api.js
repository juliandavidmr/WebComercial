const express = require('express');
const router = express.Router();

const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
const dir = '../public/';

import { Usuario } from "../db/db_usuario";
import { Menu } from "../db/db_menu";
import { Comerciante } from "../db/db_comerciante";
import { Publicidad } from "../db/db_publicidad";
import { Servicio } from "../db/db_servicios";

var dialog = require('dialog');

//Opciones del usuario

router.get('/allComerciantes', function(req, res) {
	new Comerciante().getAllComerciantes(function(datos) {
		res.send(datos);
	});
});

  router.get('/allServicios', function(req, res) {
  	new Servicio().getAllServicios(function(datos) {
  		res.send(datos);
  	});
  });

  router.get('/allPlanes', function(req, res) {
    new Publicidad().getAllTipoPublicidad(function(datos) {
    	res.send(datos);
    });
  });


module.exports = router;
