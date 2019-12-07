var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const productController = require("../Controller/ProductController");
const userController = require("../Controller/UserController");

router.get('/',  productController.home);
router.get('/index', productController.home);
router.get('/product_details/:Brand/', productController.detailProduct);
router.get('/BrandProduct/:Brand', productController.brand);

router.get('/cart', function(req, res, next) {
  res.render('Cart/Cart.hbs', { title: 'Express' });
});





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
