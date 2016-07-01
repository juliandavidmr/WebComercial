const express 		= require('express');
const router 			= express.Router();

import { Menu } from "../db/db_menu";
import { Comerciante } from "../db/db_comerciante";

const dir = '../public/';

 router.get('/', function(req, res) {
   res.render(dir + '/views/index', { title: 'Express' });
 });

 router.get('/consultas', function(req, res) {
  res.render(dir + 'views/consultas',{ data: null});
 });

 router.get('/consultas/:id', function(req, res) {
   var id = req.params.id;
   new Comerciante().getComercianteByCategoria(id, function(row) {
     const d ={
       idCat: id,
       datos:row
     }
     res.render(dir + 'views/consultas',{ data: d});
   });
 });

module.exports = router;
