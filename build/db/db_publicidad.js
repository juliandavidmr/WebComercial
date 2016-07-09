'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Publicidad = exports.Publicidad = function () {
  function Publicidad() {
    _classCallCheck(this, Publicidad);
  }

  //Get last idPublicidad of 'tipo_publicidad'


  _createClass(Publicidad, [{
    key: 'getIdTipoPublicidad',
    value: function getIdTipoPublicidad(callback) {
      knex(cdb.namest.tipo_publicidad).max('idPublicidad as last_id').limit(1).then(function (rows) {
        callback(rows);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'insertTipoPublicidad',


    //register 'Tipo Publicidad (Plan)'
    value: function insertTipoPublicidad(new_type, callback) {
      knex(cdb.namest.tipo_publicidad).insert(new_type).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'insertPublicidad',


    //register 'Publicidad (Asignar plan de publicidad a comerciante)'
    value: function insertPublicidad(new_publicidad, callback) {
      knex(cdb.namest.publicidad).insert(new_publicidad).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'getTipoPublicidadById',


    //Get 'Planes de publicidad' by id
    value: function getTipoPublicidadById(idPublicidad, callback) {
      knex(cdb.namest.tipo_publicidad).where('idPublicidad', idPublicidad).select('*').limit(1).then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Buscar todos los planes de publicidad

  }, {
    key: 'getAllTipoPublicidad',
    value: function getAllTipoPublicidad(callback) {
      knex.from(cdb.namest.tipo_publicidad).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }, {
    key: 'getPublicidadByComerciante',


    //Buscar planes de publicidad de un comerciante
    value: function getPublicidadByComerciante(idComer, callback) {
      knex.where({
        FK_idComerciante: idComerc
      }).from(cdb.namest.publicidad).select('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }
  }]);

  return Publicidad;
}();