var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

/* GET users listing. */
    //Modify categories
router.get('/', categoryController.manageCategories);
    //Specific category products management
router.get('/:CategoryName', productController.manageProducts);

module.exports = router;