'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Servicio {

	constructor() {
	}

  //Get last idServicio of 'Servicios'
  getIdServicio(callback) {
    knex(cdb.namest.servicios).max('idServicio as last_id')
			.limit(1)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

    //register 'Servicio'
    insertServicio(new_servicio, callback) {
    				knex(cdb.namest.servicios)
    					.insert(new_servicio)
    					.returning('*')
    					.then(function(row) {
    						callback(row);
    					})
    					.catch(function(error) {
    						console.error("ERROR " + error)
    					});
    	};



    //Get 'servicios' by id
  	getServicioById(idServicio, callback) {
  		knex(cdb.namest.servicios).where('idServicio', idServicio)
  			.select('*')
  			.limit(1)
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Buscar todos los servicios comerciales
    getAllServicios(callback) {
      knex
      .from(cdb.namest.servicios)
      .select('*')
      .then(function(row) {
        callback(row);
      })
      .catch(function(error) {
        console.error("ERROR" + error)
      });
  };

  //Buscar servicios de un comerciante
  getServiciosByComerciante(idComer, callback) {
    knex.where({
        FK_idComerciante: idComerc
    })
    .from(cdb.namest.servicios)
    .select('*')
    .then(function(row) {
      callback(row);
    })
    .catch(function(error) {
      console.error("ERROR" + error)
    });
};
}
