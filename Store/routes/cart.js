var express = require('express');
var router = express.Router();
const CartController = require('../Controller/CartController');
const UserController = require('../Controller/UserController');
router.get('/add-to-cart/:id', CartController.addToCart);

router.get('/shopping-cart', CartController.shoppingCart);
router.get('/checkout', UserController.isLogin, CartController.Checkout)
router.post('/pay', CartController.Pay);
module.exports = router;
