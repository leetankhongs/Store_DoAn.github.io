const passport = require('passport');
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/login', adminController.loginGet);
router.post('/login', adminController.loginPost);
router.get('/logout', adminController.logout);
module.exports = router;