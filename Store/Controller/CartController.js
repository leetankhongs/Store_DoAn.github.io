const products = require("../models/productModel");
var Cart = require('../models/cart');
const Order = require('../models/order');
const productService = require('../services/productService');

exports.addToCart = async (req, res, next) => {
    var backURL=req.header('Referer') || '/';
    var productID = req.params.id;
    
    var cart = new Cart(req.session.cart?req.session.cart: {});
    const qty = parseInt(req.body.qty) ||1  ;
    products.findById(productID, async (err, product) =>{

        if(err){
            return res.redirect('/')
        }


        cart.add(product, product._id, qty);
        req.session.cart = cart;
        if(req.user)
        {
            req.user.Cart = cart;
            req.user.save();
        }

      
        req.flash('success_msg', ' Đã thêm vào giỏ hàng thành công');
        res.redirect(backURL);
    })
}
exports.shoppingCart = async (req, res, next) => {
    if(!req.session.cart && ! req.user  || (req.session.cart === null))
        return res.render('Cart/Cart.hbs', {products: null} );

    var cart = new Cart(req.session.cart);
    res.render('Cart/Cart.hbs', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}

exports.Pay = async (req, res, next) => {
    const {Fullname, Address, Phone} = req.body;

    var order = new Order({
        User: req.user,
        Cart: req.session.cart,
        Fullname: Fullname,
        Address: Address,
        Phone: Phone
    })

    const cart = new Cart(req.session.cart);
    const arrItem = cart.generateArray();

    for(var i = 0; i < arrItem.length; i++)
    {
        const product = await productService.findProductByID(arrItem[i].item._id);
        product.Quantity -= arrItem[i].qty;
        product.save();
        //console.log(product);
    }

    order.save ().then( (err, result) => {
            req.flash('success_msg', "Bạn đã thanh toán thành công");
            req.session.cart = null;
            req.user.Cart = null;
            req.user.save();
            res.redirect('/');
    })
}
exports.removeProduct = (req, res, next) => {
    var productID = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart: {});
    cart.removeItem(productID);
    req.session.cart = cart;
    if(req.user)
    {
        req.user.Cart = cart;
        req.user.save();
    }    
    res.redirect('/cart/shopping-cart');
};
exports.reduceNumberProduct = (req, res, next) => {
    var productID = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart: {});
    cart.reduceByOne(productID);
    req.session.cart = cart;
    if(req.user)
    {
        req.user.Cart = cart;
        req.user.save();
    }    
    res.redirect('/cart/shopping-cart');
}

exports.increaseNumberProduct =(req, res, next) => {
    var productID = req.params.id;
    var cart = new Cart(req.session.cart?req.session.cart: {});
    cart.increaseByOne(productID);
    req.session.cart = cart;
    if(req.user)
    {
        req.user.Cart = cart;
        req.user.save();
    }
    res.redirect('/cart/shopping-cart');
}
exports.Checkout = async (req, res, next) => {

    if(!req.session.cart || req.session.cart === null || req.session.cart.totalPrice === 0)
    {
        req.flash('error_msg', "Không có sản phẩm để thanh toán");
        res.redirect('/cart/shopping-cart' );
    }
    else
    {
        const cart = new Cart(req.session.cart);
        const arrItem = cart.generateArray();
    
        for(var i = 0; i < arrItem.length; i++)
        {
            const product = await productService.findProductByID(arrItem[i].item._id);
            const check = await productService.checkEnoughQuantity(arrItem[i].item._id, arrItem[i].qty);
    
            if(check === false)
            {
                req.flash('error_msg', "Sản phẩm" + product.SimpleDetail + " không đủ số lượng, mong bạn chờ!");
                res.redirect('/cart/shopping-cart' );
            }
        }

        res.render('Cart/Checkout.hbs')
    }

}


exports.updateQty = (req, res, next) => {
    var productID = req.params.id;
    const {qty} = req.body;
    var cart = new Cart(req.session.cart?req.session.cart: {});
    cart.updateQty(productID,qty);
    req.session.cart = cart;
    if(req.user)
    {
        req.user.Cart = cart;
        req.user.save();
    }
    res.redirect('/cart/shopping-cart');
}

