var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');
const auth = require('../Config/auth');

/* GET users listing. */
router.get('/',auth.ensureAuthenticated, userController.loadUsers);

/* POST users listing. */
router.post('/',auth.ensureAuthenticated, userController.actionOnUser);

module.exports = router;
