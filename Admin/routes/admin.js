var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');
const auth = require('../Config/auth');

//Get
router.get('/login', adminController.loginGet);
router.get('/logout', adminController.logout);
router.get('/information',auth.ensureAuthenticated, adminController.information)

//Post
router.post('/login', adminController.loginPost);
router.post('/information/change-information', adminController.changeInformation)
router.post('/information/change-password', adminController.changePassword)

module.exports = router;