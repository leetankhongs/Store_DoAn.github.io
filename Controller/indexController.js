const products = require("../models/productModel");

exports.home = async (req,res,next) =>{
    const laptop = await  products.find({TypeProduct: 'Laptop'}).limit(8);
    const phone = await products.find({TypeProduct: 'Phone'}).limit(8);
    const SpecialLaptop = await  products.find({TypeProduct: 'Laptop'}).limit(4) ;
    const SpecialPhone = await products.find({TypeProduct: 'Phone'}).limit(4);
    res.render('index',{laptops: laptop, phones: phone,SpecialLaptop: SpecialLaptop, SpecialPhone: SpecialPhone });                
  }