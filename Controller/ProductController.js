let products = require("../models/productModel");

const {ensureAuthenticated} = require('../Controller/auth');

exports.home = (req,res,next) =>{
    products.find({TypeProduct: 'Laptop'})
      .limit(8)
      .then(function(laptop){
        products.find({TypeProduct: 'Phone'})
          .limit(8)
          .then(function(phone)
          {
            products.find({TypeProduct: 'Laptop'})
              .limit(4)
              .then(function(SpecialLaptop){
                products.find({TypeProduct: 'Phone'})
                .limit(4)
                  .then(function(SpecialPhone)
                  {
                    res.render('index',{laptops: laptop, phones: phone,SpecialLaptop: SpecialLaptop, SpecialPhone: SpecialPhone });
                  })
  
              })
          })
  
      })
  }

exports.detailProduct = (req,res, next) =>
{
    products.findById(req.query.id) 
    .then(product =>{
      products.find({Brand: req.params.Brand})
      .limit(6)
      .then(sameBrand => {
        res.render('DetailProduct.hbs', {output: product, sameBrand: sameBrand})
      })
    })
}

exports.brand = (req,res, next) =>
{
    products.find({Brand: req.params.Brand})
    .then(function(laptop)
    {
      products.count({Brand: req.params.Brand})
      .then(function(count){

        var page = parseInt(req.query.page) || 1;
        const limit = 3;
    
        const start = (page - 1) * limit;
        const end = page * limit;
        const pages = [];

        for(var i =1; i<= Math.ceil(count/limit) ; i++)
        {
          pages[i] = {
            pos : i,
            brand: req.params.Brand
          }
        }

        res.render('BrandProduct.hbs',{laptops: laptop.slice(start,end), Brand: req.params.Brand, count: count, pages: pages, currentPage: {pre: page -1, current: page, pos: page + 1 > Math.ceil(count/limit)? page: page+1} });
      })
    })
}


