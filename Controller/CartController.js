const products = require("../models/productModel");
var Cart = require('../models/cart')

exports.addToCart = async (req, res, next) => {
    var backURL=req.header('Referer') || '/';
    var productID = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart: {});

    products.findById(productID, function(err, product){

        if(err){
            return res.redirect('/')
        }

        const qty = req.query.qty ||parseInt(req.body.qty)   || 1;
        cart.add(product, product._id, qty);
        req.session.cart = cart;
        req.flash('success_msg', ' Đã thêm vào giỏ hàng thành công');
        console.log(req.session.cart);
        res.redirect(backURL);
    })
}
exports.shoppingCart = async (req, res, next) => {
    if(!req.session.cart)
        return res.render('Cart/Cart.hbs', {products: null} );

    var cart = new Cart(req.session.cart);
        res.render('Cart/Cart.hbs', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}