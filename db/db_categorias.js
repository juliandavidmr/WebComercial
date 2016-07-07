'use strict';

const knex = require('./connection');
const cdb = require('./config_database');

export class Categoria {

	constructor() {
	}


    //Get 'categoria' by Id
  	getCategoriaById(id, callback) {
  		knex(cdb.namest.categoria).where('idCategoria', id)
  			.select('*')
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Buscar todas las categorias
    getAllCategorias(callback) {
      knex.where({
          Estado: "T"
      })
      .from(cdb.namest.categoria)
      .select('*')
      .then(function(row) {
        callback(row);
      })
      .catch(function(error) {
        console.error("ERROR" + error)
      });
  };

	//Get 'subcategoria' by Id
	getSubcategoriaById(id, callback) {
		knex(cdb.namest.subcategoria).where('idSubcategoria', id)
			.select('*')
			.then(function(row) {
				callback(row);
			})
			.catch(function(error) {
				console.error("ERROR" + error)
			});
	}

	//Get 'subcategorias' by IdCategoria
	getSubcategoriasByCategoria(idCat, callback) {
		knex.where({
			FK_idCategoria: idCat,
			EstadoSub:  'T'
		})
		.select('*')
		.from(cdb.namest.subcategoria)
		.innerJoin(cdb.namest.categoria, cdb.namest.subcategoria + '.FK_idCategoria', cdb.namest.categoria + '.idCategoria')
		.orderBy('NombreSubcategoria')
		.then(function(row) {
			callback(row);
		})
		.catch(function(error) {
			console.error("ERROR" + error)
		});
	}
}
