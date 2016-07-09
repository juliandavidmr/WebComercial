'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var knex = require('./connection');
var cdb = require('./config_database');

var Menu = exports.Menu = function () {
	function Menu() {
		_classCallCheck(this, Menu);
	}

	_createClass(Menu, [{
		key: 'getSensores',
		value: function getSensores(callback) {
			knex.select('*').from(cdb.namest.menu).limit(30).then(function (rows) {
				callback(rows);
			}).catch(function (error) {
				console.error("ERROR " + error);
			});
		}
	}, {
		key: 'getPermisosRol',
		value: function getPermisosRol(idRol, callback) {
			knex.where({
				FK_idRol: idRol,
				Estado: 'T'
			}).select('*').from(cdb.namest.menu).innerJoin(cdb.namest.permisos, cdb.namest.menu + '.FK_idPermiso', cdb.namest.permisos + '.idPermiso').orderBy('NombrePermiso').limit(100).then(function (rows) {
				callback(rows);
			}).catch(function (error) {
				console.error("ERROR " + error);
			});
		}
	}]);

	return Menu;
}();