const products = require("../models/productModel");

module.exports.findProductByID = async (ID) =>
{
    return await products.findById(ID);
}

module.exports.findProductByBrandWithLimit = async(brand, limit) =>{
    return await products.find({Brand: brand}).limit(limit);
}

module.exports.findProductByBrandWithSort = async (brand, typeSort) => {
    if(typeSort === null)
    {
        return await products.find({Brand: brand});
    }
    else
    {
        return await products.find({Brand: brand}).sort(typeSort);
    }

}

module.exports.countDocumentsByBrand = async (brand) => {
    return await products.countDocuments({Brand: brand});
}

module.exports.getAllSortedProduct = async (typeSort) => {
    return await products.find().sort(typeSort);
}

module.exports.checkEnoughQuantity = async(ID, Count) =>{
    const product = await products.findById(ID);

    if(product.Quantity < Count)
        return false;
    else
        return true;
    
}

module.exports.findProductByTypeWithLimit = async (Type, limit) => {
    return await products.find({TypeProduct: Type}).limit(limit);
}

