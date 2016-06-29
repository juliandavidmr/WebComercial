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
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}
}