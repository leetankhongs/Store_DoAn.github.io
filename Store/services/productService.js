const products = require("../models/productModel");

module.exports.findProductByID = async (ID) =>
{
    return await products.findById(ID);
}

module.exports.checkEnoughQuantity = async(ID, Count) =>{
    const product = await products.findById(ID);

    if(product.Quantity < Count)
        return false;
    else
        return true;
    
}