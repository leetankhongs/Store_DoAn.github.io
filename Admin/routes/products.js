var express = require('express');
var router = express.Router({mergeParams: true});
const productController = require('../controllers/productController');

/* GET */
    //Get products
router.get('/', productController.manageProducts);
router.get('/add', productController.addProduct);

/*POST */
    //Action on products
router.post('/', productController.actionOnProduct);

module.exports = router;
