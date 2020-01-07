var express = require('express');
var router = express.Router();

const productController = require("../Controller/ProductController");

//Get
router.get('/product_details/:Brand/', productController.detailProduct);
router.get('/BrandProduct/:Brand', productController.brand);
router.get('/search', productController.search);

//post
router.post('/search', productController.searchPost);
router.post('/comment',productController.comment);
module.exports = router;

  