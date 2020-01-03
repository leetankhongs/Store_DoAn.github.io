let express = require('express');
let router = express.Router();
const topController = require('../controllers/topController');

//GET
router.get('/', topController.topProducts);

module.exports = router;