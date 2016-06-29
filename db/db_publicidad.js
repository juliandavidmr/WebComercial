'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Publicidad {

	constructor() {
	}

  //Get last idPublicidad of 'tipo_publicidad'
  getIdTipoPublicidad(callback) {
    knex(cdb.namest.tipo_publicidad).max('idPublicidad as last_id')
			.limit(1)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

    //register 'Tipo Publicidad (Plan)'
    insertTipoPublicidad(new_type, callback) {
    				knex(cdb.namest.tipo_publicidad)
    					.insert(new_type)
    					.returning('*')
    					.then(function(row) {
    						callback(row);
    					})
    					.catch(function(error) {
    						console.error("ERROR " + error)
    					});
    	};

      //register 'Publicidad (Asignar plan de publicidad a comerciante)'
      insertPublicidad(new_publicidad, callback) {
      				knex(cdb.namest.publicidad)
      					.insert(new_publicidad)
      					.returning('*')
      					.then(function(row) {
      						callback(row);
      					})
      					.catch(function(error) {
      						console.error("ERROR " + error)
      					});
      	};



    //Get 'Planes de publicidad' by id
  	getTipoPublicidadById(idPublicidad, callback) {
  		knex(cdb.namest.tipo_publicidad).where('idPublicidad', idPublicidad)
  			.select('*')
  			.limit(1)
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Buscar todos los planes de publicidad
    getAllTipoPublicidad(callback) {
      knex
      .from(cdb.namest.tipo_publicidad)
      .select('*')
      .then(function(row) {
        callback(row);
      })
      .catch(function(error) {
        console.error("ERROR" + error)
      });
  };

  //Buscar planes de publicidad de un comerciante
  getPublicidadByComerciante(idComer, callback) {
    knex.where({
        FK_idComerciante: idComerc
    })
    .from(cdb.namest.publicidad)
    .select('*')
    .then(function(row) {
      callback(row);
    })
    .catch(function(error) {
      console.error("ERROR" + error)
    });
};
}
