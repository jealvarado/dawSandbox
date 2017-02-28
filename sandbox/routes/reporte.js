var express = require ('express');
var router = express.Router();


/* GET home page. */
router.get('/fecha', function(req, res, next) {
  res.render('reporte', { title: 'Express' });
});
router.get('/curso', function(req, res, next) {
  res.render('curso_reporte', { title: 'Express' });
});

module.exports = router;
