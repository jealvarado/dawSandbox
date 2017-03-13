'use strict'
var express = require ('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sandbox_est', { title: 'Ejercicios Estudiantes' });
});


module.exports = router;