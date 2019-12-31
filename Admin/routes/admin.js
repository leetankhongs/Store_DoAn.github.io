const passport = require('passport');
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
const auth = require('../Config/auth');

router.get('/login', adminController.loginGet);
router.post('/login', adminController.loginPost);
router.get('/logout', adminController.logout);
router.get('/information',auth.ensureAuthenticated, adminController.information)
router.post('/information/change-information', adminController.changeInformation)
router.post('/information/change-password', adminController.changePassword)
module.exports = router;