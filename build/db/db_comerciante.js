'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Comerciante = exports.Comerciante = function () {
  function Comerciante() {
    _classCallCheck(this, Comerciante);
  }

  //Get last idComerciante of 'Comerciante'


  _createClass(Comerciante, [{
    key: 'getIdComerciante',
    value: function getIdComerciante(callback) {
      knex(cdb.namest.comerciante).max('idComerciante as last_id').limit(1).then(function (rows) {
        callback(rows);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'insertComerciante',


    //register 'Comerciante'
    value: function insertComerciante(new_comerciante, callback) {
      knex(cdb.namest.comerciante).insert(new_comerciante).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }, {
    key: 'getComercianteById',


    //Get 'comerciante' by id
    value: function getComercianteById(idComerc, callback) {
      knex(cdb.namest.comerciante).where('idComerciante', idComerc).select('*').limit(1).then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Get all 'comerciantes'

  }, {
    key: 'getAllComerciantes',
    value: function getAllComerciantes(callback) {
      knex(cdb.namest.comerciante).select('*').orderBy('Nombre').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //Get 'comerciante' by categoria

  }, {
    key: 'getComercianteByCategoria',
    value: function getComercianteByCategoria(idCat, callback) {
      knex.where({
        FK_idSubcategoria: idCat,
        RegEstado: 'T'
      }).select('*').from(cdb.namest.reg_cat).innerJoin(cdb.namest.subcategoria, cdb.namest.reg_cat + '.FK_idSubcategoria', cdb.namest.subcategoria + '.idSubcategoria').innerJoin(cdb.namest.comerciante, cdb.namest.reg_cat + '.FK_idComerciante', cdb.namest.comerciante + '.idComerciante').innerJoin(cdb.namest.categoria, cdb.namest.subcategoria + '.FK_idCategoria', cdb.namest.categoria + '.idCategoria').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR" + error);
      });
    }

    //asignar categorias a comerciante'

  }, {
    key: 'asignarCategorias',
    value: function asignarCategorias(new_row, callback) {
      knex(cdb.namest.reg_cat).insert(new_row).returning('*').then(function (row) {
        callback(row);
      }).catch(function (error) {
        console.error("ERROR " + error);
      });
    }
  }]);

  return Comerciante;
}();