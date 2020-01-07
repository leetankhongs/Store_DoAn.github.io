module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated())
        {
            return next();
        }

        req.flash('error_msg','Vui lòng đăng nhập để xem tài nguyên');
        res.redirect('/admin/login')
    }
}