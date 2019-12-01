var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');



const productController = require("../Controller/ProductController");
const newUser = require("../models/userModel");
console.log(newUser);
router.get('/', productController.home);

router.get('/index', productController.home);
router.get('/product_details/:id/:Brand', productController.detailProduct);
router.get('/BrandProduct/:Brand', productController.brand);


router.get('/register', function(req, res, next) {
  res.render('Login/register.hbs', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('Login/login.hbs', { title: 'Express' });
});
router.get('/forgetpass', function(req, res, next) {
  res.render('Login/ForgetPass.hbs', { title: 'Express' });
});
  
router.get('/User', function(req, res, next) {
  res.render('Login/User.hbs', { title: 'Express' });
});

router.get('/SamSung', function(req, res, next) {
  res.render('Phone/SamSung.hbs', { title: 'Express' });
});
router.get('/Iphone', function(req, res, next) {
  res.render('Phone/Iphone.hbs', { title: 'Express' });
});
router.get('/Oppo', function(req, res, next) {
  res.render('Phone/Oppo.hbs', { title: 'Express' });
});
router.get('/Nokia', function(req, res, next) {
  res.render('Phone/Nokia.hbs', { title: 'Express' });
});

router.get('/Asus', function(req, res, next) {
  products.find({Brand: 'Asus'})
  .then(function(laptop)
  {
    res.render('Laptop/Asus.hbs',{laptops: laptop});
  })
});

router.get('/Acer', function(req, res, next) {
  res.render('Laptop/Acer.hbs', { title: 'Express' });
});
router.get('/Dell', function(req, res, next) {
  res.render('Laptop/Dell.hbs', { title: 'Express' });
});
router.get('/HP', function(req, res, next) {
  res.render('Laptop/HP.hbs', { title: 'Express' });
});
router.get('/Lenovo', function(req, res, next) {
  res.render('Laptop/Lenovo.hbs', { title: 'Express' });
});
router.get('/MSI', function(req, res, next) {
  res.render('Laptop/MSI.hbs', { title: 'Express' });
});
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
// router.get('/product_details', function(req, res, next) {
//   res.render('Laptop/LaptopDetail.hbs', { title: 'Express' });
// });
router.post('/register', (req, res) =>
{
  const{Name,Email,Password,Password2,Address,Phone } =req.body;
  let errors = [];

  //check nhập đủ
  if(!Name || !Email || !Password || !Password2 || !Address || !Phone)
  {
    errors.push({msg:'Hãy nhập tất cả các thông tin'});
  }

  //check password match

  if(Password !== Password2)
  {
    errors.push({msg: "Mật khẩu không khớp"});
  }

  //check password length >=6 

  if( Password.length < 6)
  {
    errors.push({msg:"Hãy nhập mật khẩu trên 6 kí tự"});
  }

  if(errors.length > 0 )
  {
    res.render('./Login/register',{
      errors,
      Name,
      Email,
      Password,
      Password2,
      Address,
      Phone
    })
  }
  else{
    newUser.findOne({email:Email}).then(newUser => {
      if(newUser)
      {
        errors.push({msg: "Email đã tồn tại"});
        res.render('./Login/register',{
         errors,
         Name,
         Email,
         Password,
         Password2,
         Address,
         Phone
        });
      }
      else
      {
        
      }
    })
    //create new user
    const newUser1 = new newUser ({
        Name,
        Email,
        Password,
        Address,
        Phone
    });
    newUser1.save(function(err,newUser){
      if(err)
      throw err;   
    })
    let message = "Tạo tài khoản thành công. Đăng nhập ngay!"
    res.render('./Login/login',{message});
  } 
});

router.post()


module.exports = router;
