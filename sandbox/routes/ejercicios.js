var express = require ('express');
var router = express.Router();

var ejercicioCtrl = require('../controllers/ejercicios');

/* GET home page. */


router.get('/:ejercicioId', ejercicioCtrl.getEjercicio);
router.post('/', ejercicioCtrl.saveEjercicio);
router.put('/:ejercicioId', ejercicioCtrl.updateEjercicio);
router.delete('/:ejercicioId', ejercicioCtrl.deleteEjercicio);


module.exports = router;