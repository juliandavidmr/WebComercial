'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var bcrypt = require('bcryptjs');
var cdb = require('./config_database');

var Usuario = exports.Usuario = function () {
  function Usuario() {
    _classCallCheck(this, Usuario);
  }

  //Get last idPersona of 'Persona'


  _createClass(Usuario, [{
    key: 'getIdPersona',
    value: function getIdPersona(callback) {
      knex(cdb.namest.persona).max('idPersona as last_id').limit(1).then(function (rows) {
        callback(rows);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'insertUsuario',


    //register 'Cuenta'
    value: function insertUsuario(new_user, callback) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(new_user.password, salt, function (err, hash) {
          new_user.password = hash;
          knex(cdb.namest.cuenta).insert(new_user).returning('*').then(function (row) {
            callback(row);
          }).catch(function (error) {
            console.error("ERROR " + error);
          });
        });
      });
    }
  }, {
    key: 'insertPersona',


    //register 'Persona'
    value: function insertPersona(new_persona, callback) {
      knex(cdb.namest.persona).insert(new_persona).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'getUserByUsername',


    //Get user by Username atribute of 'cuenta'
    value: function getUserByUsername(username, callback) {

      knex.where({
        Username: username
      }).from(cdb.namest.cuenta).select('*').limit(1).then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }, {
    key: 'getUserByIdCuenta',


    //Get user by idCuenta
    value: function getUserByIdCuenta(userId, callback) {
      knex(cdb.namest.cuenta).where('idCuenta', userId).select('*').innerJoin(cdb.namest.persona, cdb.namest.cuenta + '.FK_idPersona', cdb.namest.persona + '.idPersona').limit(1).then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Compare two passwords

  }, {
    key: 'comparePassword',
    value: function comparePassword(candidatePassword, hash, callback) {
      bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        //if (err) throw err;
        callback(null, isMatch);
      });
    }

    //Get roles

  }, {
    key: 'getRoles',
    value: function getRoles(callback) {
      knex(cdb.namest.rol).select("*").then(function (rows) {
        callback(rows);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }]);

  return Usuario;
}();