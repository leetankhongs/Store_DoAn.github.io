var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register.html', function(req, res, next) {
  res.render('Login/register.hbs', { title: 'Express' });
});
router.get('/SamSung.html', function(req, res, next) {
  res.render('Phone/SamSung.hbs', { title: 'Express' });
});
router.get('/Iphone.html', function(req, res, next) {
  res.render('Phone/Iphone.hbs', { title: 'Express' });
});
router.get('/Oppo.html', function(req, res, next) {
  res.render('Phone/Oppo.hbs', { title: 'Express' });
});
router.get('/Nokia.html', function(req, res, next) {
  res.render('Phone/Nokia.hbs', { title: 'Express' });
});
router.get('/Asus.html', function(req, res, next) {
  res.render('Laptop/Asus.hbs', { title: 'Express' });
});
router.get('/Acer.html', function(req, res, next) {
  res.render('Laptop/Acer.hbs', { title: 'Express' });
});
router.get('/Dell.html', function(req, res, next) {
  res.render('Laptop/Dell.hbs', { title: 'Express' });
});
router.get('/HP.html', function(req, res, next) {
  res.render('Laptop/HP.hbs', { title: 'Express' });
});
router.get('/Lenovo.html', function(req, res, next) {
  res.render('Laptop/Lenovo.hbs', { title: 'Express' });
});
router.get('/MSI.html', function(req, res, next) {
  res.render('Laptop/MSI.hbs', { title: 'Express' });
});
router.get('/cart.html', function(req, res, next) {
  res.render('Cart/Cart.hbs', { title: 'Express' });
});

router.get('/forgetpass.html', function(req, res, next) {
  res.render('Login/ForgetPass.hbs', { title: 'Express' });
});

router.get('/products.html', function(req, res, next) {
  res.render('Login/index.hbs', { title: 'Express' });
});
router.get('/User.html', function(req, res, next) {
  res.render('Login/User.hbs', { title: 'Express' });
});
router.get('/History.html', function(req, res, next) {
  res.render('Cart/History.hbs', { title: 'Express' });
});
router.get('/ThanhToan.html', function(req, res, next) {
  res.render('Cart/States/ThanhToan.hbs', { title: 'Express' });
});
router.get('/VanChuyen.html', function(req, res, next) {
  res.render('Cart/States/VanChuyen.hbs', { title: 'Express' });
});
router.get('/GiaoHang.html', function(req, res, next) {
  res.render('Cart/States/GiaoHang.hbs', { title: 'Express' });
});
router.get('/product_details.html', function(req, res, next) {
  res.render('Laptop/LaptopDetail.hbs', { title: 'Express' });
});

module.exports = router;
