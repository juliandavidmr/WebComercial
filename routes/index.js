const express 		= require('express');
const router 			= express.Router();

import { Menu } from "../db/db_menu";
import { Comerciante } from "../db/db_comerciante";
import { Categoria } from "../db/db_categorias";

const dir = '../public/';

 router.get('/', function(req, res) {
   res.render(dir + '/views/index', { title: 'Express' });
 });

 router.get('/consultas', function(req, res) {
   const d = {
     idCat:0,
     datos:null
   }
  res.render(dir + 'views/consultas',{ data: d});
 });

 router.get('/empresa', function(req, res) {
  res.render(dir + 'views/empresa');
 });

 router.get('/consultas/:id', function(req, res) {
   var id = req.params.id;

   new Categoria().getSubcategoriasByCategoria(id, function(row, est) {
     const d = {
       datos:row,
       idCat: id
     }
     res.render(dir + 'views/consultas',{data: d});
   });
 });

module.exports = router;
