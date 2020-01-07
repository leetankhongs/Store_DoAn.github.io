const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

const User = require("../models/userModel");
const Verify = require("../models/verify");
const orderService = require('../services/orderService');
const Order = require('../models/order');
const passport = require('passport');


exports.registerGet = (req, res, next) => {
  res.render('Login/register.hbs', { title: 'Express' });
}
exports.loginGet = (req, res, next) => {
  res.render('Login/login.hbs', { title: 'Express' });
}

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
    User.findOne({Email: Email}).then(UserResult => {
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
          Phone,
        });
  

  //Hash password
      bcrypt.genSalt(10,(err, salt)=>
        bcrypt.hash(newUser.Password,salt,(err,hash)=>
        {

          if (err) throw err;
          newUser.Password = hash;

          //save
          newUser.save().then(User => {
            var rand,mailOptions,host,link;
            rand = Math.floor((Math.random() * 50000) + 139);
            host = req.get('host');
            link = 'http://' + req.get('host')+"/users/activeAccount/?email="+Email+"&verify="+rand;

            var smtpTransport = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                  user: "hfordocument@gmail.com",
                  pass: "hung123#"
              }
            });
            var mailOptions=
            {
              to : Email,
              subject : "Please confirm your Email account",
              html : "Hello,<br> Please Click on the link to active your account.<br><a href="+link+">Click here to active</a>"
            }
            smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                res.render("/Login/ForgetPass.hbs", {er: "Can't send email right now. Try later!"});
            }});

            const verifyControl = new Verify({
              Email: Email,
              Code: rand
            })
            verifyControl.save();

            req.flash('success_msg','Hãy xác nhận email của mình!!!');
              res.redirect('/users/login');}).
              catch(err => console.log(err));
        }))
          }
        })
    
  } 
}
exports.authenticate = (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
}

exports.login = async (req, res, next) => {

  const user1 = await User.findOne({Email: req.user.Email});
  const isActive = user1.isActive;
  if(isActive)
  {
  
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
  }else{
    req.flash('error','Hãy xác thực email của mình');
    res.redirect('/users/login')
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


exports.forgetPassword = async (req,res,next)=>
{
  var email = req.body.email;
  var backURL = req.header('Referer') || '/';
  var rand,mailOptions,host,link;
  rand=Math.floor((Math.random() * 50000) + 69);
  host =req.get('host');
  link="http://"+req.get('host')+"/users/exchange-password/?email="+email+"&verify="+rand;
  const findUser = await User.findOne({Email: email});
  console.log(findUser);
  if(findUser == null)
  {
    req.flash("error_msg","Email này không tồn tại");
    res.redirect(backURL);
  }

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "hfordocument@gmail.com",
        pass: "hung123#"
    }
  });

  var mailOptions=
  {
    to : email,
    subject : "Please confirm your Email account",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  }

  
  console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.render("/Login/ForgetPass.hbs", {er: "Can't send email right now. Try later!"});
     }});

  const findUserVerified = await Verify.findOne({Email: email});
  console.log(findUserVerified);
  if(findUserVerified != null)
  {
    const id_findUserVerified = findUserVerified._id;
    await Verify.findByIdAndDelete({_id: id_findUserVerified});
  }
  const verifyControl = new Verify({
    Email: email,
    Code: rand
  })
  await verifyControl.save();

  req.flash('success_msg','Kiểm tra email và đổi mật khẩu!');
  res.redirect('/users/login');
}

exports.statusProduct = async (req, res, next) =>
{
    const idUser = req.user;
    const itemofUser = await Order.find({User: idUser}).sort({Time:'descending'});
    var chuagiao = [];
    var danggiao = []; 
    var dagiao = [];

    for(var i = 0; i< itemofUser.length; i++)
    {
        if(itemofUser[i].Delivery === 0)
            chuagiao.push(itemofUser[i])
        else
        {
            if(itemofUser[i].Delivery === 1)
                danggiao.push(itemofUser[i]);
            else
                dagiao.push(itemofUser[i]);
        }
    }

    res.render('Cart/States/GiaoHang.hbs', {chuagiao, danggiao, dagiao});
}
exports.detailOrder = async (req, res, next) => {
  const idOrder = req.query.id;
  const order = await orderService.findOrderByID(idOrder);
  console.log(order);

  res.render('Cart/DetailOrder', {order});
}


exports.exchangePassword = async (req, res, next)=>
{
  var pass1 = req.body.newpassword1;
  var pass2 = req.body.newpassword2;
  var email = req.query.email;
  var code = req.query.verify;
  var backURL = req.header('Referer') || '/';

  const findUser = await User.findOne({Email: email});
  if(findUser != null )
  {
    const verifiedEmail = await Verify.findOne({Email: email});
    if(verifiedEmail != null )
    {
      const codeUser = verifiedEmail.Code;
      console.log(codeUser);
      if(codeUser == code)
      {
        if(pass1 != pass2)
        {
          req.flash("error_msg","Mật khẩu không khớp, thử lại!");
          res.redirect(backURL);
        }
        else if (pass1.length <6 || pass2.length<6)
        {
          req.flash("error_msg","Hãy điền mật khẩu trên 6 kí tự, thử lại!");
          res.redirect(backURL);
        }
        else
        {
          await bcrypt.genSalt(10,(err, salt)=>
          bcrypt.hash(pass1,salt,(err,hash)=>
          {
            if(err) throw err;
            
            findUser.Password = hash;
            findUser.save().then(() =>
            {
              const verifyID = verifiedEmail._id;
              Verify.findOneAndDelete({_id:verifyID}).then(()=>
              {
                req.flash('success_msg','Đổi mật khẩu thành công. Đăng nhập ngay!!!');
                res.redirect('/users/login');
              });
            
            });
          }));
        
        }
      }
    }
  }
  else{
  
  req.flash('error','Có gì đó không đúng. Hãy kiểm tra lại!');
  res.redirect('/users/login');
  }
}

exports.verifyAccount = async (req, res, next)=>
{
  const email = req.query.email;
  const code = req.query.verify;

  const findUser = await User.findOne({Email: email});
  if(findUser !== null )
  {
    const verifiedEmail = await Verify.findOne({Email: email});
    if(verifiedEmail !== null )
    {
      const codeUser = verifiedEmail.Code;
      if(parseInt(codeUser) === parseInt(code))
      {
        findUser.isActive = true;
        findUser.save().then(() =>
        {
          const verifyID = verifiedEmail._id;
          Verify.findOneAndDelete({_id:verifyID}).then(()=>
          {
            req.flash('success_msg','Xác thực thành công. Đăng nhập ngay!!!');
            res.redirect('/users/login');
          });
        
        });
      }
    }
  }
  else
  {
    req.flash('error','Có gì đó không đúng. Hãy kiểm tra lại!');
    res.redirect('/users/login');
  }


}

exports.forgetPass = function(req, res, next) {
  res.render('Login/ForgetPass.hbs', { title: 'Express' });
}

exports.exchangePasswordGet = function(req,res,next)
{
  res.render("Login/ChangePassword.hbs");
};

exports.activeAccount = (req,res, next)=>
{
  res.render("Login/verify.hbs");
}