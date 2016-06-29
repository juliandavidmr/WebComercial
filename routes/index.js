const express 		= require('express');
const router 			= express.Router();

import { Menu } from "../db/db_menu";

const dir = '../public/';

 router.get('/', function(req, res) {
   res.render(dir + '/views/index', { title: 'Express' });
 });

module.exports = router;
