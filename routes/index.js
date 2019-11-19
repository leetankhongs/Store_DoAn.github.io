var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//Kết nối database
mongoose.connect('mongodb+srv://admin123:admin123@cluster0-kqj7g.mongodb.net/Store?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }).then(
	() => {
		console.log('KN THANH CONG')

	},
	err => { /** handle initial connection error */
		console.log('KNOI loi~');
	}
);

let products = require("../models/productModel");

router.get('/', function(req,res,next){
  products.find({TypeProduct: 'Laptop'})
    .limit(8)
    .then(function(laptop){
      products.find({TypeProduct: 'Phone'})
        .limit(8)
        .then(function(phone)
        {
          products.find({TypeProduct: 'Laptop'})
            .limit(4)
            .then(function(SpecialLaptop){
              products.find({TypeProduct: 'Phone'})
              .limit(4)
                .then(function(SpecialPhone)
                {
                  res.render('index',{laptops: laptop, phones: phone,SpecialLaptop: SpecialLaptop, SpecialPhone: SpecialPhone });
                })

            })
        })

    })
});

router.get('/index.html', function(req,res,next){
  products.find({TypeProduct: 'Laptop'})
    .limit(8)
    .then(function(laptop){
      products.find({TypeProduct: 'Phone'})
        .limit(8)
        .then(function(phone)
        {
          products.find({TypeProduct: 'Laptop'})
            .limit(4)
            .then(function(SpecialLaptop){
              products.find({TypeProduct: 'Phone'})
              .limit(4)
                .then(function(SpecialPhone)
                {
                  res.render('index',{laptops: laptop, phones: phone,SpecialLaptop: SpecialLaptop, SpecialPhone: SpecialPhone });
                })

            })
        })

    })
});
router.get('/product_details/:id/:Brand', function(req,res, next)
{
    products.findById(req.params.id) 
    .then(product =>{
      products.find({Brand: req.params.Brand})
      .limit(6)
      .then(sameBrand => {
        res.render('DetailProduct.hbs', {output: product, sameBrand: sameBrand})
      })
    })
});
router.get('/BrandProduct/:Brand', function(req,res, next)
{
    products.find({Brand: req.params.Brand})
    .then(function(laptop)
    {
      products.count({Brand: req.params.Brand})
      .then(function(count){
        res.render('BrandProduct.hbs',{laptops: laptop, Brand: req.params.Brand, count: count});
      })
    })
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
  products.find({Brand: 'Asus'})
  .then(function(laptop)
  {
    res.render('Laptop/Asus.hbs',{laptops: laptop});
  })
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
// router.get('/product_details.html', function(req, res, next) {
//   res.render('Laptop/LaptopDetail.hbs', { title: 'Express' });
// });

module.exports = router;
