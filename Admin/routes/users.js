var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../Config/auth');

/* GET users listing. */
router.get('/',auth.ensureAuthenticated, userController.loadUsers);
router.get('/edit-user',auth.ensureAuthenticated, userController.getInformationOfUser)

/* POST users listing. */
router.post('/',auth.ensureAuthenticated, userController.actionOnUser);
router.post('/edit-user/change-information',auth.ensureAuthenticated, userController.changeInformation)

module.exports = router;
