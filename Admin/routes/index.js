const passport = require('passport');
var express = require('express');
var router = express.Router();

const auth = require('../Config/auth');

/* GET home page. */
router.get('/', auth.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index.html', function(req, res, next) {
  res.render('index.hbs', { title: 'Express' });
});
router.get('/TKNgay.html', function(req, res, next) {
  res.render('ThongKe/TKNgay.hbs', { title: 'Express' });
});
router.get('/TKThang.html', function(req, res, next) {
  res.render('ThongKe/TKThang.hbs', { title: 'Express' });
});
router.get('/TKNam.html', function(req, res, next) {
  res.render('ThongKe/TKNam.hbs', { title: 'Express' });
});
router.get('/EditUser.html', function(req, res, next) {
  res.render('NguoiDung/EditUser.hbs', { title: 'Express' });
});
router.get('/DaGiao.html', function(req, res, next) {
  res.render('DonHang/DaGiao.hbs', { title: 'Express' });
});
router.get('/ChuaGiao.html', function(req, res, next) {
  res.render('DonHang/ChuaGiao.hbs', { title: 'Express' });
});
router.get('/DangGiao.html', function(req, res, next) {
  res.render('DonHang/DangGiao.hbs', { title: 'Express' });
});
router.get('/TuyChinh.html', function(req, res, next) {
  res.render('GianHang/TuyChinh.hbs', { title: 'Express' });
});
router.get('/ThemGianHang.html', function(req, res, next) {
  res.render('GianHang/ThemGianHang.hbs', { title: 'Express' });
});
router.get('/DienThoai.html', function(req, res, next) {
  res.render('GianHang/QLSanPham.hbs', { title: 'Express' });
});
router.get('/Laptop.html', function(req, res, next) {
  res.render('GianHang/Laptop.hbs', { title: 'Express' });
});
router.get('/ThemSanPham.html', function(req, res, next) {
  res.render('GianHang/ThemSanPham.hbs', { title: 'Express' });
});
router.get('/TopSP.html', function(req, res, next) {
  res.render('TOP/TopSP.hbs', { title: 'Express' });
});
router.get('/TopGHLaptop.html', function(req, res, next) {
  res.render('TOP/TopGHLaptop.hbs', { title: 'Express' });
});
router.get('/TopGHPhone.html', function(req, res, next) {
  res.render('TOP/TopGHPhone.hbs', { title: 'Express' });
});
module.exports = router;
