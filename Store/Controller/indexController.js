const products = require("../models/productModel");
const productService = require("../services/productService");

exports.home = async (req,res,next) =>{
    const laptop = await productService.findProductByTypeWithLimit('Laptop', 8);
    const phone = await productService.findProductByTypeWithLimit('Phone', 8);
    const SpecialLaptop = await productService.findProductByTypeWithLimit('Laptop', 4);
    const SpecialPhone = await productService.findProductByTypeWithLimit('Phone', 4);
    res.render('index',{laptops: laptop, phones: phone,SpecialLaptop: SpecialLaptop, SpecialPhone: SpecialPhone});                
}