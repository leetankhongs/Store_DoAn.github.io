var express = require('express');
var router = express.Router();

const userController = require("../Controller/UserController");


//Get
router.get('/login', userController.loginGet);
router.get('/register', userController.registerGet);
router.get('/forgetpass', userController.forgetPass);
router.get('/exchange-password', userController.exchangePasswordGet);
router.get('/infor', userController.informationUser);
router.get('/change-password', userController.pageChangePassword)
router.get('/logout', userController.logout);
router.get('/status', userController.statusProduct);
router.get('/DetailOrder', userController.detailOrder);
router.get('/activeAccount', userController.activeAccount);


//Post
router.post('/exchange-password', userController.exchangePassword);
router.post('/register', userController.register);
router.post('/login', userController.authenticate, userController.login);
router.post('/change-password', userController.changePassword);
router.post('/forgetpass', userController.forgetPassword);

module.exports = router;
