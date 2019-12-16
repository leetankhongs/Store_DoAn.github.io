var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.loadUsers);

/* POST users listing. */
router.post('/', userController.actionOnUser);

module.exports = router;
