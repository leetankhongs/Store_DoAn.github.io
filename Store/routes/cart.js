var express = require('express');
var router = express.Router();

const CartController = require('../Controller/CartController');
const UserController = require('../Controller/UserController');

//Get
router.get('/add-to-cart/:id', CartController.addToCart);
router.get('/reduce/:id', CartController.reduceNumberProduct);
router.get('/increase/:id', CartController.increaseNumberProduct);
router.get('/remove/:id', CartController.removeProduct);
router.get('/shopping-cart', CartController.shoppingCart);
router.get('/checkout', UserController.isLogin, CartController.Checkout)

//Post
router.post('/add-to-cart/:id', CartController.addToCart);
router.post('/pay', CartController.Pay);
router.post('/updateQty/:id',CartController.updateQty);

module.exports = router;
