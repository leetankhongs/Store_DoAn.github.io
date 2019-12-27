var express = require('express');
var router = express.Router({mergeParams: true});
const productController = require('../controllers/productController');
const upload = require("../handlers/multer");

/* GET */
    //Get products
router.get('/', productController.manageProducts);
router.get('/add', productController.addProduct);

/*POST */
    //Action on products
router.post('/', productController.actionOnProduct);
router.post('/addProduct', upload.single('image'), productController.addProductPost);


module.exports = router;
