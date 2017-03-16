var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/usuarios');
var bCrypt = require('bcrypt-nodejs');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}
/*
router.get('/inicio', function(req, res){
	if(req.user.Rol=="Administrador"){
		res.redirect('/users')
	}if(req.user.Rol=='Profesor'|| req.user.Rol=='Ayudante'){
		res.redirect('/ejercicios')
	}if (req.user.Rol=='Estudiante'){
		res.redirect('/ejerciciosEstudiante');
	}
});*/

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({ correo: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}		
		if(!isValidPassword(user, password)){			
			return done(null, false, {message: 'Contraseña inválida '});
		} else {
			return done(null, user);			
		}		
	});
}));


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

var validacion = function (req, res, next) {
	if (!req.session || req.session.rol != 'admin') {
		res.sendStatus(401);
		return;
	}
	next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user) {
		res.redirect('/index');
	}
	else{
		res.render('login', { title: 'Login Sandbox' });
	}
});


// Route to authenticate a user (POST http://localhost:3000/api/authenticate)
router.post('/authenticate', function(req, res, next) {
	/*
	if (req.body.usuario == 'admin' && req.body.password == '1234') {
		req.session.usuario = 'admin';
		req.session.rol = 'admin';
		req.session.visitas = 0;
		res.send('Session created');
		return;
	}
	if (req.body.usuario == 'emora' && req.body.password == 'abcd') {
		req.session.usuario = 'emora';
		req.session.rol = 'vendedor';
		req.session.visitas = 0;
		res.send('Session created');
		return;
	}
	res.send('Usuario o contraseña erronea');
	*/
	//find the user
	User.findOne({ name: req.body.username }, function(err, user) {
		
		if (err) throw err;

		if (!user) {
			console.log(req.body.username);			
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			console.log(user);
			// check if password matches
			if (user.password != req.body.psw) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: service.createToken(user)
				});
			}
		}
	});

});

router.post('/',
	passport.authenticate('local', {failureRedirect:'/',failureFlash: true}),
  	function(req, res) {
  		res.redirect('/index');
	}
);

var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.contrasena);
}

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/cambiarpass', function (req, res) {
	if (req.user) {
		res.render('cambiarpass', { title: 'Cambiar Contraseña' });
	}
	else{
		res.redirect('/');		
	}
});

router.post('/cambiarpass', function (req, res) {
	if (req.user) {
		if(req.body.password==req.body.pconfirm){
			User.findOne({ _id: req.user.id }, function(err, usuario) {
				if (err) {
					return res.status(500).send({ message: `Error al buscar Perfil de Usuario: ${err}`});
				}
				var hash=createHash(req.body.password);
				usuario.contrasena=hash;
				usuario.save(function (err, updatedPerfil) {
					if (err) {
						return res.status(500).send({ message: `Error al guardar el Perfil de Usuario: ${err}`});
					}
					return res.redirect('/index');
				});
			});
		}
		else{
			res.redirect('/cambiarpass');	
		}
	}
	else{
		res.redirect('/');	
	}
});

var createHash = function(password){
	return bCrypt.hashSync(password);
}

module.exports = router;