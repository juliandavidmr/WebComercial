var knex = require('knex')({
 client: 'mysql',
 connection: {
  host: '127.0.0.1',
  user: 'root',
  password: 'root.2016',
  database: 'independiente'
 },
 pool: {
  min: 0,
  max: 10
 }
});

module.exports = knex;
