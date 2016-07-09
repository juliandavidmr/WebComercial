'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Categoria = exports.Categoria = function () {
	function Categoria() {
		_classCallCheck(this, Categoria);
	}

	//Get 'categoria' by Id


	_createClass(Categoria, [{
		key: 'getCategoriaById',
		value: function getCategoriaById(id, callback) {
			knex(cdb.namest.categoria).where('idCategoria', id).select('*').then(function (row) {
				callback(row);
			}).catch(function (error) {
				console.error("ERROR" + error);
			});
		}

		//Buscar todas las categorias

	}, {
		key: 'getAllCategorias',
		value: function getAllCategorias(callback) {
			knex.where({
				Estado: "T"
			}).from(cdb.namest.categoria).select('*').then(function (row) {
				callback(row);
			}).catch(function (error) {
				console.error("ERROR" + error);
			});
		}
	}, {
		key: 'getSubcategoriaById',


		//Get 'subcategoria' by Id
		value: function getSubcategoriaById(id, callback) {
			knex(cdb.namest.subcategoria).where('idSubcategoria', id).select('*').then(function (row) {
				callback(row);
			}).catch(function (error) {
				console.error("ERROR" + error);
			});
		}

		//Get 'subcategorias' by IdCategoria

	}, {
		key: 'getSubcategoriasByCategoria',
		value: function getSubcategoriasByCategoria(idCat, callback) {
			knex.where({
				FK_idCategoria: idCat,
				EstadoSub: 'T'
			}).select('*').from(cdb.namest.subcategoria).innerJoin(cdb.namest.categoria, cdb.namest.subcategoria + '.FK_idCategoria', cdb.namest.categoria + '.idCategoria').orderBy('NombreSubcategoria').then(function (row) {
				callback(row);
			}).catch(function (error) {
				console.error("ERROR" + error);
			});
		}
	}]);

	return Categoria;
}();