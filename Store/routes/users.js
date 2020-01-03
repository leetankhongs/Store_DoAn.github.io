var express = require('express');
var router = express.Router();
const userController = require("../Controller/UserController");



/* GET users listing. */

router.get('/login', userController.loginGet);

router.get('/register', userController.registerGet);

router.get('/forgetpass', function(req, res, next) {
  res.render('Login/ForgetPass.hbs', { title: 'Express' });
});

router.post('/register', userController.register);


router.post('/login', userController.authenticate, userController.login);
router.get('/infor', userController.informationUser);
router.get('/change-password', userController.pageChangePassword)
router.post('/change-password', userController.changePassword);
router.get('/logout', userController.logout);
router.get('/status', userController.statusProduct);
router.get('/DetailOrder', userController.detailOrder)

module.exports = router;
