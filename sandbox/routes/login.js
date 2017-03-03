var express = require('express');
var router = express.Router();


var validacion = function (req, res, next) {
	if (!req.session || req.session.rol != 'admin') {
		res.sendStatus(401);
		return;
	}
	next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Sandbox' });
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
	User.findOne({ name: req.body.uname }, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

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

module.exports = router;