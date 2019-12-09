var express = require('express');
var router = express.Router();
const passport = require('passport');

const productController = require("../Controller/ProductController");

router.get('/product_details/:Brand/', productController.detailProduct);
router.get('/BrandProduct/:Brand', productController.brand);
router.post('/BrandProduct/:Brand/sort', function(req, res, next){
  const typeSort = req.body.sort;
  res.redirect('/product/BrandProduct/' + req.params.Brand + "?sort=" +typeSort)
});
router.post('/search', function(req, res, next){
    const {require} = req.body;
    res.redirect('/product/search?require='+require);
  });
router.post('/search/sort',function(req, res, next){
  const require = req.query.require;
  const typeSort = req.body.sort;
  res.redirect('/product/search' + "?require=" + require + "&sort=" + typeSort)
}); 
router.get('/search', productController.search);


module.exports = router;

  