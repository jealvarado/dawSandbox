'use strict'

var express = require('express');
var router = express.Router();

var cursoCtrl = require('../controllers/curso');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:cursoId', cursoCtrl.getCurso);
router.get('/', cursoCtrl.getCursos);
router.post('/', cursoCtrl.saveCurso);
router.put('/:cursoId', cursoCtrl.updateCurso);
router.delete('/:cursoId', cursoCtrl.deleteCurso);


module.exports = router;
