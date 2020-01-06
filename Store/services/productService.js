const products = require("../models/productModel");

module.exports.findProductByID = async (ID) =>
{
    return await products.findById(ID);
}

module.exports.findProductByBrandWithLimit = async(brand, limit) =>{
    return await products.find({Brand: brand, isDelete: false}).limit(limit);
}

module.exports.findProductByBrandWithSort = async (brand, typeSort) => {
    if(typeSort === null)
    {
        return await products.find({Brand: brand, isDelete: false});
    }
    else
    {
        return await products.find({Brand: brand, isDelete: false}).sort(typeSort);
    }

}

module.exports.countDocumentsByBrand = async (brand) => {
    return await products.countDocuments({Brand: brand, isDelete: false});
}

module.exports.getAllSortedProduct = async (typeSort) => {
    return await products.find({isDelete: false}).sort(typeSort);
}

module.exports.checkEnoughQuantity = async(ID, Count) =>{
    const product = await products.findById(ID);

    if(product.Quantity < Count)
        return false;
    else
        return true;
    
}

module.exports.findProductByTypeWithLimit = async (Type, limit) => {
    return await products.find({TypeProduct: Type, isDelete: false}).limit(limit);
}

