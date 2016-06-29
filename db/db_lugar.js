'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Lugar {

	constructor() {
	}


    //Get 'ciudades' by idDpto
  	getCiudadByDpto(idDpto, callback) {
  		knex(cdb.namest.mpio).where('FK_idDpto', idDpto)
  			.select('*')
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Buscar todas las ciudades
    getAllCiudades(callback) {
      knex
      .from(cdb.namest.mpio)
      .select('*')
      .then(function(row) {
        callback(row);
      })
      .catch(function(error) {
        console.error("ERROR" + error)
      });
  };

  //Buscar todos los departamentos
  getAllDptos(callback) {
    knex
    .from(cdb.namest.dpto)
    .select('*')
    .then(function(row) {
      callback(row);
    })
    .catch(function(error) {
      console.error("ERROR" + error)
    });
};
}
