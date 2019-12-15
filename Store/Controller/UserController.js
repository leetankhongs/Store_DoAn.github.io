let User = require("../models/userModel");
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Cart = require('../models/cart');
exports.register = (req,res,next) =>
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
    User.findOne({email:Email}).then(UserResult => {
      if(UserResult)
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
        //create new user
        const newUser = new User ({
          Name,
          Email,
          Password,
          Address,
          Phone
        });
  

  //Hash password
      bcrypt.genSalt(10,(err, salt)=>
        bcrypt.hash(newUser.Password,salt,(err,hash)=>
        {

          if (err) throw err;
          newUser.Password = hash;

          //save
          newUser.save().then(User => {
            req.flash('success_msg','Đăng kí thành công. Đăng nhập ngay!!!');
              res.redirect('/users/login');

          }).catch(err => console.log(err));
        }
        ))
          }
        })
    
  } 
}
exports.login = (req, res, next) => {

      if(req.session.oldUrl)
      {
        res.redirect(req.session.oldUrl);
      }
      else
      {
        if(req.session.cart)
          req.user.Cart =req.session.cart  ;
        else
        req.session.cart = req.user.Cart;
        res.redirect('/');
      }
  
}


exports.logout = (req, res) =>{
  req.logout();
  req.session.cart = null;
  req.flash('success_msg', ' Bạn đã đăng xuất thành công');
  res.redirect('/users/login');
}

exports.isLogin = (req, res, next) =>{
  if(req.isAuthenticated())
  {
      return next();
  }
  req.flash('error_msg','Bạn cần phải đăng nhập để thực hiện việc thanh toán');
  req.session.oldUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.redirect('/users/login')
}

