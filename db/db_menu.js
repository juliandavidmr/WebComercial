'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Menu {

	constructor() {
	}

	getSensores(callback) {
		knex
			.select('*')
			.from(cdb.namest.menu)
			.limit(30)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

	getPermisosRol(idRol, callback) {
		knex.where({
		  FK_idRol: idRol,
		  Estado:  'T'
		})
			.select('*')
			.from(cdb.namest.menu)
			.innerJoin(cdb.namest.permisos, cdb.namest.menu + '.FK_idPermiso', cdb.namest.permisos + '.idPermiso')
			.orderBy('NombrePermiso')
			.limit(100)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};
}
