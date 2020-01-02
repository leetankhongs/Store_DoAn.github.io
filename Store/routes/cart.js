var express = require('express');
var router = express.Router();
const CartController = require('../Controller/CartController');
const UserController = require('../Controller/UserController');
const Cart = require('../models/cart');
router.get('/add-to-cart/:id', CartController.addToCart);
router.post('/add-to-cart/:id', CartController.addToCart);

router.get('/shopping-cart', CartController.shoppingCart);
router.get('/checkout', UserController.isLogin, CartController.Checkout)
router.post('/pay', CartController.Pay);
router.get('/reduce/:id', CartController.reduceNumberProduct);
router.get('/increase/:id', CartController.increaseNumberProduct);
router.get('/remove/:id', CartController.removeProduct);
router.get('/status', CartController.statusProduct);
router.post('/updateQty/:id',(req, res, next) => {
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
} )
module.exports = router;
