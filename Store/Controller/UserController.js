let User = require("../models/userModel");
const bcrypt = require('bcryptjs');
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

 
        if(req.session.cart)
          req.user.Cart =req.session.cart  ;
        else
        req.session.cart = req.user.Cart;
        
        if(req.session.oldUrl)
        {
          res.redirect(req.session.oldUrl);
        }
        else
        {
        res.redirect('/');
        }
  
}

exports.informationUser = (req, res, next) => {
  
  res.render('Login/User.hbs');
}

exports.pageChangePassword = (req, res, next) => {
  res.render('Login/passwordchange.hbs');
}
exports.changePassword = (req, res, next) => {
  const {oldpassword, newpassword1, newpassword2} = req.body
  bcrypt.compare(oldpassword, req.user.Password, (err, isMatch) =>
  {
      if(err) throw err;

      if(isMatch)
      {
          if(newpassword1.localeCompare(newpassword2)===0)
          {
            bcrypt.genSalt(10,(err, salt)=>
            bcrypt.hash(newpassword1,salt,(err,hash)=>
            {
    
              if (err) throw err;
              req.user.Password = hash;
    
              //save
              req.user.save().then(() => {
                req.logout();
                req.flash('success_msg','Thay đổi mật khẩu thành công, mời đăng nhập lại');
                res.redirect('/users/login');
    
              }).catch(err => console.log(err));
            }))
          }
          else
          {
            req.flash('error_msg',"Mật khẩu mới không khớp");
            res.redirect('/users/infor')
          }
      }
      else
      {
          req.flash('error_msg',"Mật khẩu cũ không chính xác");
          res.redirect('/users/infor')
      }

  });     
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
  req.session.oldUrl = req.originalUrl;
  res.redirect('/users/login')
}

