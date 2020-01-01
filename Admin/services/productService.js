const Product = require('../models/productModel');

module.exports.getProductsCount = async (category, brand) => {
    const query = {TypeProduct: { $regex : new RegExp(`\\b${category.Type}\\b`, "i") }};
    if(brand){
        query.Brand = {$regex : new RegExp(`\\b${brand}\\b`, "i")};
    }
    return await Product.countDocuments(query);
}

module.exports.findProductByID = async (_id) => {
    return await Product.findById(_id);
}

module.exports.load = async (currentPage, pageLength, category, brand) => {
    const skip = currentPage * pageLength;
    let params = null;
    if(category) {
        if(!params) params = {};
        params.TypeProduct = { $regex : new RegExp(`\\b${category.Type}\\b`, "i") };
    }
    if(brand) {
        if(!params) params = {};
        params.Brand = {$regex : new RegExp(`\\b${brand}\\b`, "i")};
    }
    const products = await Product.find(params, null, {skip, limit: pageLength}, null).sort({Brand: 'asc'});

    return products;
}

module.exports.removeProduct = async (_id) => {
    return await Product.findByIdAndUpdate(_id, {isDelete: true});
}

module.exports.recoverProduct = async (_id) => {
    return await Product.findByIdAndUpdate(_id, {isDelete: false});
}

module.exports.checkProductAvailable = async(category, brand) => {
    if(!category && !brand) return null;
    const query = {};
    if(category){
        query.TypeProduct = { $regex : new RegExp(`\\b${category.Type}\\b`, "i") };
    }
    if(brand){
        query.Brand = {$regex : new RegExp(`\\b${brand}\\b`, "i")};
    }
    return await Product.findOne(query);
}