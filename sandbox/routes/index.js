var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user) {
		if (req.user.rol=='Administrador') {
			res.render('index', { title: 'SandBox' });
		}
		else if(req.user.rol=='Estudiante'){
			res.redirect('/sandbox_est');
		}
		else if (req.user.rol=='Profesor') {
			res.redirect('/sandbox_prof');
		}
	}
	else{
		res.redirect('/');
	}		
	
});

module.exports = router;