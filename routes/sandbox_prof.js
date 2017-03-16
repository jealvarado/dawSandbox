'use strict'
var express = require ('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user) {
		if(req.user.rol=='Administrador' || req.user.rol=='Profesor'){
			res.render('sandbox_prof', {title: 'Ejercicios Profesor'});
		}
		else{
			res.redirect('/index');
		}
	}else{
		res.redirect('/');
	}
	
});


module.exports = router;