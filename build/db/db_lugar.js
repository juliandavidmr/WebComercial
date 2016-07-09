'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Lugar = exports.Lugar = function () {
  function Lugar() {
    _classCallCheck(this, Lugar);
  }

  //Get 'ciudades' by idDpto


  _createClass(Lugar, [{
    key: 'getCiudadByDpto',
    value: function getCiudadByDpto(idDpto, callback) {
      knex(cdb.namest.mpio).where('FK_idDpto', idDpto).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Buscar todas las ciudades

  }, {
    key: 'getAllCiudades',
    value: function getAllCiudades(callback) {
      knex.from(cdb.namest.mpio).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }, {
    key: 'getAllDptos',


    //Buscar todos los departamentos
    value: function getAllDptos(callback) {
      knex.from(cdb.namest.dpto).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }]);

  return Lugar;
}();