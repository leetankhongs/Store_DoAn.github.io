var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');

// Other routers
const productRouter = require('./products');

/* GET */
    //Manage categories
router.get('/', categoryController.manageCategories);
    //Page to add new category
router.get('/add', categoryController.addCategory);

/*POST*/
    //Categories
router.post('/', categoryController.actionOnCategory);
    //Update, if N/A then insert
router.post('/upsert', categoryController.upsertCategory)
   
/* Đến chỗ khác */
    //Specific category products management
router.use('/:CategoryName/products', productRouter);

module.exports = router;