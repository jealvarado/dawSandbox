var express = require ('express');
var router = express.Router();

var resueltoCtrl = require('../controllers/resuelto');

/* GET home page. */

router.get('/actual',resueltoCtrl.getResueltoActual)
router.get('/:resueltoId', resueltoCtrl.getResuelto);
router.get('/usuario/:Id',resueltoCtrl.getResueltoUsuario)
router.get('/', resueltoCtrl.getResueltos);
router.post('/', resueltoCtrl.saveResuelto);
router.put('/:resueltoId', resueltoCtrl.updateResuelto);
router.delete('/:resueltoId', resueltoCtrl.deleteResuelto);
router.post('/resueltosPorFecha', resueltoCtrl.resueltosPorFecha);


module.exports = router;
