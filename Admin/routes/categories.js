var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const auth = require('../Config/auth');


// Other routers
const productRouter = require('./products');

/* GET */
    //Manage categories
router.get('/',auth.ensureAuthenticated, categoryController.manageCategories);
    //Page to add new category
router.get('/add',auth.ensureAuthenticated, categoryController.addCategory);
    //Specific category products management
router.get('/:CategoryName/products',auth.ensureAuthenticated, productController.manageProducts);

/*POST*/
    //Categories
router.post('/',auth.ensureAuthenticated, categoryController.actionOnCategory);
        //Update, if N/A then insert
router.post('/upsert',auth.ensureAuthenticated, categoryController.upsertCategory)
    //Products
router.post('/:CategoryName/products',auth.ensureAuthenticated, productController.actionOnProduct);

router.get('/add', categoryController.addCategory);

/* Đến chỗ khác */
    //Specific category products management
router.use('/:CategoryName/products', productRouter);

module.exports = router;