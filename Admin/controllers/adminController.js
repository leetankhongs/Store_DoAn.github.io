const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports.loginGet = (req, res, next) => {
    res.render('Admin/Login.hbs', { title: 'Express' });
}

module.exports.loginPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
}
module.exports.logout = (req, res) =>{
    req.logout();
    req.session.cart = null;
    req.flash('success_msg', ' Bạn đã đăng xuất thành công');
    res.redirect('/admin/login');
  }
module.exports.information = (req, res, next) => {
    res.render('Admin/Information');
};
module.exports.changeInformation = (req, res, next) => {
    const {Name, Address, Phone} = req.body;
    req.user.Name = Name;
    req.user.Address = Address;
    req.user.Phone = Phone;

    req.user.save();
    req.flash('success_msg','Cập nhập thông tin thành công');
    res.redirect('/admin/information')
};
module.exports.changePassword = (req, res, next) => {
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
};