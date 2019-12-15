const products = require("../models/productModel");
var Cart = require('../models/cart');
const Order = require('../models/order');


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
        if(req.user)
        {
            req.user.Cart = cart;
            req.user.save();
        }
        req.flash('success_msg', ' Đã thêm vào giỏ hàng thành công');
        console.log(req.session.cart);
        res.redirect(backURL);
    })
}
exports.shoppingCart = async (req, res, next) => {
    if(!req.session.cart && ! req.user  || (req.session.cart === null))
        return res.render('Cart/Cart.hbs', {products: null} );

    var cart = new Cart(req.session.cart);
    res.render('Cart/Cart.hbs', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}

exports.Pay = (req, res, next) => {
    const {Fullname, Address, Phone} = req.body;

    var order = new Order({
        User: req.user,
        Cart: req.session.cart,
        Fullname: Fullname,
        Address: Address,
        Phone: Phone
    })

    order.save ().then( (err, result) => {
            req.flash('success_msg', "Bạn đã thanh toán thành công");
            req.session.cart = null;
            req.user.Cart = null;
            req.user.save();
            res.redirect('/');
    })
}

exports.Checkout =  (req, res, next) => {

    if(!req.session.cart || req.session.cart === null)
    {
        req.flash('error_msg', "Không có sản phẩm để thanh toán");
        req.session.cart = null;
        res.redirect('/cart/shopping-cart' );
    }
    else
    {
        res.render('Cart/Checkout.hbs')
    }

}