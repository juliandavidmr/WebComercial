const express = require('express');
const router = express.Router();

var session = require('express-session');

const app 						= express();
const http 						= require('http').Server(app);
const io 							= require('socket.io')(http);
//const db_u = require('../db/db_usuario');
const dir = '../public/';

app.use(session({secret: 'ssshhhhh'}));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import { Menu } from "../db/db_menu";
import { Usuario } from "../db/db_usuario";

const rol_user = "";
var sess;

// Login
router.get('/', function(req, res) {
  sess = req.session;
//Session set when user Request our app via URL
  if(sess.email) {
    console.log("si");
    res.redirect('/home/main');
  }
else {
  console.log("No");
    res.render(dir + 'views/home/login',{ message: '' });
}
});

router.get('/login', function(req, res) {
	res.render(dir + 'views/usuario/login',{ message: '' });
});

router.post('/login', function(req, res) {
  sess = req.session;
  sess.email=req.body.email;
	res.render(dir + 'views/usuario/login',{ message: '' });
});

router.post('/main', function(req, res) {
  var username = req.body.username;

  sess = req.session;
  sess.email=req.body.username;

  new Usuario().getUserByUsername(username, function(row) {
    if(row.length>0){
      var password = req.body.password;
      new Usuario().comparePassword(password, row[0].Password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          sess.rol = row[0].FK_idRol;
          sess.cuenta = row[0].idCuenta;
          res.redirect("/home/main");
        } else {
          res.render(dir + 'views/home/login', { message: 'Contraseña inválida' });
			}
      });
    } else{
      res.render(dir + 'views/home/login', { message: 'Usuario no encontrado' });
  }
});

  });

  router.get('/main', function(req, res) {
    sess = req.session;
    if(sess.email) {
      new Menu().getPermisosRol(sess.rol, function(permisos) {
        new Usuario().getUserByIdCuenta(sess.cuenta, function(datos) {
          const obj = {
            list_permisos: permisos,
            user_data: datos
          }
          res.render(dir + 'views/home/menu', { title: 'Menú principal' , data: obj });
        });
      });
    } else {
      res.render(dir + 'views/home/login', { message: '' });
    }
  });

  router.get('/logout',function(req,res){
    console.log("Logout");
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.render(dir + 'views/home/login', { message: '' });
      }
});
});

module.exports = router;
