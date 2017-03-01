'use strict'

var express = require('express');
var router = express.Router();

var perfilCtrl = require('../controllers/perfil');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:perfilId', perfilCtrl.getPerfil);
router.post('/', perfilCtrl.savePerfil);
router.put('/:perfilId', perfilCtrl.updatePerfil);
router.delete('/:perfilId', perfilCtrl.deletePerfil);


module.exports = router;
