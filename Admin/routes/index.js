var express = require('express');
var router = express.Router();
const auth = require('../Config/auth');
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', auth.ensureAuthenticated, function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index.html', function (req, res, next) {
  res.render('index.hbs', { title: 'Express' });
});
router.get('/statistical',  auth.ensureAuthenticated, indexController.statistical)
router.get('/statistical/year', auth.ensureAuthenticated, indexController.statisticalYear )
router.get('/statistical/month',  indexController.statisticalMonth )
router.get('/statistical/day',  auth.ensureAuthenticated, indexController.statisticalDay)
module.exports = router;
