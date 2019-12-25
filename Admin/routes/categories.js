var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

/* GET */
    //Manage categories
router.get('/', categoryController.manageCategories);
    //Page to add new category
router.get('/add', categoryController.addCategory);
    //Specific category products management
router.get('/:CategoryName/products', productController.manageProducts);

/*POST*/
    //Categories
router.post('/', categoryController.actionOnCategory);
        //Update, if N/A then insert
router.post('/upsert', categoryController.upsertCategory)
    //Products
router.post('/:CategoryName/products', productController.actionOnProduct);


module.exports = router;