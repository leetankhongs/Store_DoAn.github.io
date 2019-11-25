let products = require("../models/productModel");

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
    products.findById(req.params.id) 
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
        res.render('BrandProduct.hbs',{laptops: laptop, Brand: req.params.Brand, count: count});
      })
    })
}
