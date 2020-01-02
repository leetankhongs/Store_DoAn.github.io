var express = require('express');
var router = express.Router({mergeParams: true});
const productController = require('../controllers/productController');
const auth = require("../Config/auth");
const upload = require("../handlers/multer");

/* GET */
    //Get products
router.get('/',auth.ensureAuthenticated, productController.manageProducts);
router.get('/add', auth.ensureAuthenticated, productController.addProduct);

/*POST */
    //Action on products
router.post('/', auth.ensureAuthenticated, productController.actionOnProduct);
router.post('/upsertProduct', upload.single('image'), auth.ensureAuthenticated, productController.upsertProductPost);


module.exports = router;
