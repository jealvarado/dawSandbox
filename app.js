var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
//var mongoose = require('mongoose');

// models
//var usrMdl = require('./models/usuarios');

// routes
var login = require('./routes/login');
var index = require('./routes/index');
//var users = require('./routes/users');
var reporte = require('./routes/reporte');
var usuarioAPI = require('./routes/usuarios');
var ejerciciosAPI = require('./routes/ejercicios');
var resueltoAPI = require('./routes/resuelto');
var session = require('express-session');
var perfilAPI = require('./routes/perfil');
var cursosAPI = require('./routes/cursos');
var sandbox_prof = require('./routes/sandbox_prof');
var sandbox_est = require('./routes/sandbox_est');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: "ProyectoDaw20162",
	resave: false,
	saveUninitialized: false
}));
// Configuring Passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

app.use('/', login);
app.use('/index', index);
app.use('/reporte', reporte);
app.use('/api/usuario', usuarioAPI);
app.use('/api/ejercicios', ejerciciosAPI);
app.use('/api/cursos', cursosAPI);
app.use('/api/perfil', perfilAPI);
app.use('/api/resuelto', resueltoAPI);
app.use('/sandbox_prof', sandbox_prof);
app.use('/sandbox_est', sandbox_est);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
