'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Comerciante {

	constructor() {
	}

  //Get last idComerciante of 'Comerciante'
  getIdComerciante(callback) {
    knex(cdb.namest.comerciante).max('idComerciante as last_id')
			.limit(1)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

    //register 'Comerciante'
    insertComerciante(new_comerciante, callback) {
    				knex(cdb.namest.comerciante)
    					.insert(new_comerciante)
    					.returning('*')
    					.then(function(row) {
    						callback(row);
    					})
    					.catch(function(error) {
    						console.error("ERROR " + error)
    					});
    	};



    //Get 'comerciante' by id
  	getComercianteById(idComerc, callback) {
  		knex(cdb.namest.comerciante).where('idComerciante', idComerc)
  			.select('*')
  			.limit(1)
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Get all 'comerciantes'
  	getAllComerciantes(callback) {
  		knex(cdb.namest.comerciante)
  			.select('*')
				.orderBy('Nombre')
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

		//Get 'comerciante' by categoria
  	getComercianteByCategoria(idCat, callback) {
				knex.where({
				  FK_idSubcategoria: idCat,
				  RegEstado:  'T'
				})
				.select('*')
				.from(cdb.namest.reg_cat)
				.innerJoin(cdb.namest.subcategoria, cdb.namest.reg_cat + '.FK_idSubcategoria', cdb.namest.subcategoria + '.idSubcategoria')
				.innerJoin(cdb.namest.comerciante, cdb.namest.reg_cat + '.FK_idComerciante', cdb.namest.comerciante + '.idComerciante')
				.innerJoin(cdb.namest.categoria, cdb.namest.subcategoria + '.FK_idCategoria', cdb.namest.categoria + '.idCategoria')
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

		//asignar categorias a comerciante'
		asignarCategorias(new_row, callback) {
						knex(cdb.namest.reg_cat)
							.insert(new_row)
							.returning('*')
							.then(function(row) {
								callback(row);
							})
							.catch(function(error) {
								console.error("ERROR " + error)
							});
			};
}
