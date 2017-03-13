'use strict'
var express = require ('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sandbox_est', { title: 'Ejercicios Estudiantes' });
});


router.get('/ejercicio', function(req, res, next) {
  res.render('sandbox_estd2', { title: 'Ejercicios Estudiantes' });
});


module.exports = router;