const passport = require('passport');

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