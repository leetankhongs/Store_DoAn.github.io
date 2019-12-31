const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require("../Config/auth");

// GET
router.get('/', auth.ensureAuthenticated, orderController.getOrders);
// POST
router.post('/changeState', auth.ensureAuthenticated, orderController.changeStateOrder);

module.exports = router;