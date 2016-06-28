const express 		= require('express');
const router 			= express.Router();

  import { Menu } from "../db/db_menu";

//console.log(db_dato.area);

const dir = '../public/';
var sess;
/*
  GET: Pagina principal
  dashboard
 */

 router.get('/', function(req, res) {
   res.render(dir + '/views/index', { title: 'Express' });
 });


/*router.get('/', function(req, res) {
    //res.render(dir + 'dashboard',{ layout: 'layout' });
    sess = req.session;
    //Session set when user Request our app via URL
    if(req.isAuthenticated()) {
	 * This line check Session existence.
	 * If it existed will do some action.

	res.render(dir + '/views/dashboard');
    }
    else {
	res.redirect('/usuarios/login');
    }
});

/*
  GET: Pagina principal
  dashboard
 */

module.exports = router;
