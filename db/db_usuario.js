'use strict';

const knex = require('./connection');
const bcrypt = require('bcryptjs');
const cdb = require('./config_database');

export class Usuario {

	constructor() {
	}

  //Get last idPersona of 'Persona'
  getIdPersona(callback) {
    knex(cdb.namest.persona).max('idPersona as last_id')
			.limit(1)
			.then(function(rows) {
				callback(rows);
			})
			.catch(function(error) {
				console.error("ERROR " + error)
			});
	};

  //register 'Cuenta'
  insertUsuario(new_user, callback) {
  		bcrypt.genSalt(10, function(err, salt) {
  			bcrypt.hash(new_user.password, salt, function(err, hash) {
  				new_user.password = hash;
  				knex(cdb.namest.cuenta)
  					.insert(new_user)
  					.returning('*')
  					.then(function(row) {
  						callback(row);
  					})
  					.catch(function(error) {
  						console.error("ERROR " + error)
  					});
  			});
  		});
  	};

    //register 'Persona'
    insertPersona(new_persona, callback) {
    				knex(cdb.namest.persona)
    					.insert(new_persona)
    					.returning('*')
    					.then(function(row) {
    						callback(row);
    					})
    					.catch(function(error) {
    						console.error("ERROR " + error)
    					});
    	};

      //Get user by Username atribute of 'cuenta'
      getUserByUsername(username, callback) {

        knex.where({
    		    Username: username
    		})
    		.from(cdb.namest.cuenta)
  			.select('*')
  			.limit(1)
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	};

    //Get user by idCuenta
  	getUserByIdCuenta(userId, callback) {
  		knex(cdb.namest.cuenta).where('idCuenta', userId)
  			.select('*')
        .innerJoin(cdb.namest.persona, cdb.namest.cuenta + '.FK_idPersona', cdb.namest.persona + '.idPersona')
  			.limit(1)
  			.then(function(row) {
  				callback(row);
  			})
  			.catch(function(error) {
  				console.error("ERROR" + error)
  			});
  	}

    //Compare two passwords
  	comparePassword(candidatePassword, hash, callback) {
  	    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
  		//if (err) throw err;
  			callback(null, isMatch);
  		});
  	}
}
