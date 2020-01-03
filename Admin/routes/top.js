let express = require('express');
let router = express.Router();
const topController = require('../controllers/topController');
const auth = require("../Config/auth");

//GET
router.get('/', auth.ensureAuthenticated, topController.topProducts);

module.exports = router;