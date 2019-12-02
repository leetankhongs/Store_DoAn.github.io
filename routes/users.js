var express = require('express');
var router = express.Router();
const userController = require("../Controller/UserController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('Login/login.hbs', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('Login/register.hbs', { title: 'Express' });
});

router.get('/forgetpass', function(req, res, next) {
  res.render('Login/ForgetPass.hbs', { title: 'Express' });
});
  
router.get('/User', function(req, res, next) {
  res.render('Login/User.hbs', { title: 'Express' });
});

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
