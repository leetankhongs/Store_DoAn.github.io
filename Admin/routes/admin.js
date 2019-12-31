const passport = require('passport');
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
const bcrypt = require('bcryptjs');


router.get('/login', adminController.loginGet);
router.post('/login', adminController.loginPost);
router.get('/logout', adminController.logout);
router.get('/information', (req, res, next) => {
    res.render('Admin/Information');
})
router.post('/information/change-information', (req, res, next) => {
    const {Name, Address, Phone} = req.body;
    req.user.Name = Name;
    req.user.Address = Address;
    req.user.Phone = Phone;

    req.user.save();
    req.flash('success_msg','Cập nhập thông tin thành công');
    res.redirect('/admin/information')
})
router.post('/information/change-password', (req, res, next) => {
    const {oldPassword, newPassword1, newPassword2} = req.body
    bcrypt.compare(oldPassword, req.user.Password, (err, isMatch) =>
    {
        if(err) throw err;
  
        if(isMatch)
        {
            if(newPassword1.localeCompare(newPassword2)===0)
            {
              bcrypt.genSalt(10,(err, salt)=>
              bcrypt.hash(newPassword1,salt,(err,hash)=>
              {
      
                if (err) throw err;
                req.user.Password = hash;
      
                //save
                req.user.save().then(() => {
                  req.logout();
                  req.flash('success_msg','Thay đổi mật khẩu thành công, mời đăng nhập lại');
                  res.redirect('/admin/login');
      
                }).catch(err => console.log(err));
              }))
            }
            else
            {
              req.flash('error_msg',"Mật khẩu mới không khớp");
              res.redirect('/admin/information')
            }
        }
        else
        {
            req.flash('error_msg',"Mật khẩu cũ không chính xác");
            res.redirect('/admin/information')
        }
  
    });     
})
module.exports = router;