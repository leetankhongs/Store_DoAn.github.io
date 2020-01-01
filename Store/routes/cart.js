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
module.exports = router;
