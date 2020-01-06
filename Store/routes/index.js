var express = require('express');
var router = express.Router();

const indexController = require("../Controller/indexController")

//Get
router.get('/',  indexController.home);
router.get('/index', indexController.home);

module.exports = router;
