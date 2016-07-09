'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var flash = require('connect-flash');
//var config = require('./config'); // get our config file

var routes_index = require('./routes/index');
var routes_home = require('./routes/home');
var routes_users = require('./routes/user');
var routes_comerciante = require('./routes/comerciante');
var routes_publicidad = require('./routes/publicidad');
var routes_api = require('./routes/api');

var Menu = require('./db/db_menu');
/*import { TipoSensor } from "./db/db_tiposensor";
import { Estacion } from "./db/db_estacion";*/

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
//
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use(flash());
// Passport init
app.use(passport.initialize());
app.use(passport.session());
/*
================================================================================
																		RUTAS
================================================================================
 */
app.use('/', routes_index);
app.use('/home', routes_home);
app.use('/user', routes_users);
app.use('/comerciante', routes_comerciante);
app.use('/publicidad', routes_publicidad);
app.use('/api', routes_api);

/*
================================================================================
															MOTOR DE VISTAS
================================================================================
 */
app.set('view engine', 'ejs');

/*
================================================================================
													VARIABLES LOCALES EXPRESS
================================================================================
 */
app.locals.moment = require('moment');
app.locals.moment.locale('es');

/*
================================================================================
											CARPETAS ESTATICAS DEL SERVIDOR
================================================================================
 */
app.use(express.static('public'));
app.use(express.static('public/assets'));

/*
================================================================================
															LAYOUT
		Estado:			 false
		Descripcion: Se define la ruta del layout, false si no se usará alguna
================================================================================
 */
app.set('layout', false); // defaults to 'layout'
//app.set('superSecret', config.secret); // secret variable

/*
================================================================================
															SEGURIDAD
	Express Session
	Descripcion: Almacenamiento de mensajes en la sesion con flash
================================================================================
 */

// Global Vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

/*
================================================================================
																SOCKET IO
	Descripcion: Tiempo real
================================================================================
 */

// Define/initialize our global vars
var notes = []; //Todas las notas registradas
var socketCount = 0; // Cantidad de usuarios conectados

io.sockets.on('connection', function (socket) {
	// Socket has connected, increase socket count
	socketCount++;
	// Let all sockets know how many are connected
	io.sockets.emit('users connected', socketCount);

	socket.on('disconnect', function () {
		// Decrease the socket count on a disconnect, emit
		socketCount--;
		io.sockets.emit('users connected', socketCount);
	});
});

/*
var watch = function() {
		new Menu().getPermisosRol(1, function(datos) {
			const data = {
				tiposensores: datos
			}
			io.sockets.emit('datos datos', data);
      console.log(data);
		});

}
watch();

app.get('/menu/:idRol', function(req, res) {
	const idRol = req.params['idRol'];
  console.log('id: ' + idRol);
	new Menu().getPermisosRol(idRol, function(row) {
		if (row) {
			res.render('./public/views/home/menu', {
				list_permisos: row
			});
      console.log("h: " + row);
			io.sockets.emit('permisos_rol', row);
		}
	});
});*/

/*
 * Escuchador
 * Listen 3000
 * */
http.listen(3000, function () {
	console.log('listening on *:3000');
});