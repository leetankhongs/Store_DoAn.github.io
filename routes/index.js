var express = require('express');
var router = express.Router();
const passport = require('passport');

const productController = require("../Controller/ProductController");
const indexController = require("../Controller/indexController")

router.get('/',  indexController.home);
router.get('/index', indexController.home);

router.get('/products', function(req, res, next) {
  res.render('Login/index.hbs', { title: 'Express' });
});
router.get('/History', function(req, res, next) {
  res.render('Cart/History.hbs', { title: 'Express' });
});
router.get('/ThanhToan', function(req, res, next) {
  res.render('Cart/States/ThanhToan.hbs', { title: 'Express' });
});
router.get('/VanChuyen', function(req, res, next) {
  res.render('Cart/States/VanChuyen.hbs', { title: 'Express' });
});
router.get('/GiaoHang', function(req, res, next) {
  res.render('Cart/States/GiaoHang.hbs', { title: 'Express' });
});


module.exports = router;
