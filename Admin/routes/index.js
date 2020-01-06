var express = require('express');
var router = express.Router();

const auth = require('../Config/auth');
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/',  auth.ensureAuthenticated,  indexController.index );
router.get('/index.html',  auth.ensureAuthenticated,  indexController.index);
router.get('/statistical',  auth.ensureAuthenticated, indexController.statistical)
router.get('/statistical/year', auth.ensureAuthenticated, indexController.statisticalYear )
router.get('/statistical/month', auth.ensureAuthenticated, indexController.statisticalMonth )
router.get('/statistical/day',  auth.ensureAuthenticated, indexController.statisticalDay)

module.exports = router;
