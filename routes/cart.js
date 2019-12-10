var express = require('express');
var router = express.Router();
const CartController = require('../Controller/CartController');
router.get('/add-to-cart/:id', CartController.addToCart);

router.get('/shopping-cart', CartController.shoppingCart);

module.exports = router;
