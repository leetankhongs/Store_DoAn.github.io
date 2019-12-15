var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.loadUsers);

router.post('/', userController.deleteUser);

module.exports = router;
