'use strict';

var _db_menu = require('../db/db_menu');

var _db_usuario = require('../db/db_usuario');

var _db_comerciante = require('../db/db_comerciante');

var express = require('express');
var router = express.Router();

var session = require('express-session');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dir = '../public/';

app.use(session({ secret: 'ssshhhhh' }));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var sess;

router.get('/', function (req, res) {
  sess = req.session;
  if (sess.email) {
    res.redirect('/home/main');
  } else {
    res.render(dir + 'views/home/login', { message: '' });
  }
});

// Login
router.get('/login', function (req, res) {
  res.render(dir + 'views/usuario/login', { message: '' });
});

router.post('/login', function (req, res) {
  sess = req.session;
  sess.email = req.body.email;
  res.render(dir + 'views/usuario/login', { message: '' });
});

router.post('/main', function (req, res) {
  var username = req.body.username;

  sess = req.session;
  sess.email = req.body.username;

  new _db_usuario.Usuario().getUserByUsername(username, function (row) {
    if (row.length > 0) {
      var password = req.body.password;
      new _db_usuario.Usuario().comparePassword(password, row[0].Password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          sess.rol = row[0].FK_idRol;
          sess.cuenta = row[0].idCuenta;
          res.redirect("/home/main");
        } else {
          res.render(dir + 'views/home/login', { message: 'Contraseña inválida' });
        }
      });
    } else {
      res.render(dir + 'views/home/login', { message: 'Usuario no encontrado' });
    }
  });
});

router.get('/main', function (req, res) {
  sess = req.session;
  if (sess.email) {

    new _db_menu.Menu().getPermisosRol(sess.rol, function (permisos) {
      new _db_usuario.Usuario().getUserByIdCuenta(sess.cuenta, function (datos) {
        new _db_comerciante.Comerciante().getAllComerciantes(function (comer) {
          var obj = {
            list_permisos: permisos,
            user_data: datos,
            comerciantes: comer
          };
          res.render(dir + 'views/home/menu', { title: 'Menú principal', data: obj });
        });
      });
    });
  } else {
    res.render(dir + 'views/home/login', { message: '' });
  }
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.render(dir + 'views/home/login', { message: '' });
    }
  });
});

router.get('/getList', function (req, res) {
  res.json([{
    titulo: 'Titulo1',
    description: 'description'
  }, {
    titulo: 'Titulo2',
    description: 'description2'
  }]);
});

module.exports = router;