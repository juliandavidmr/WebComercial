'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Servicio = exports.Servicio = function () {
  function Servicio() {
    _classCallCheck(this, Servicio);
  }

  //Get last idServicio of 'Servicios'


  _createClass(Servicio, [{
    key: 'getIdServicio',
    value: function getIdServicio(callback) {
      knex(cdb.namest.servicios).max('idServicio as last_id').limit(1).then(function (rows) {
        callback(rows);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'insertServicio',


    //register 'Servicio'
    value: function insertServicio(new_servicio, callback) {
      knex(cdb.namest.servicios).insert(new_servicio).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'getServicioById',


    //Get 'servicios' by id
    value: function getServicioById(idServicio, callback) {
      knex(cdb.namest.servicios).where('idServicio', idServicio).select('*').limit(1).then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Buscar todos los servicios comerciales

  }, {
    key: 'getAllServicios',
    value: function getAllServicios(callback) {
      knex.from(cdb.namest.servicios).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }, {
    key: 'getServiciosByComerciante',


    //Buscar servicios de un comerciante
    value: function getServiciosByComerciante(idComer, callback) {
      knex.where({
        FK_idComerciante: idComerc
      }).from(cdb.namest.servicios).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }]);

  return Servicio;
}();