const Product = require('../models/productModel');

module.exports.getProductsCount = async (category, brand, name) => {
    const query = {TypeProduct: { $regex : new RegExp(`\\b${category.Type}\\b`, "i") }};
    if(brand){
        query.Brand = {$regex : new RegExp(`\\b${brand}\\b`, "i")};
    }
    if(name){
        query.Name = {$regex : new RegExp(`\\b${name}\\b`, "i")};
    }
    return await Product.countDocuments(query);
}

module.exports.findProductByID = async (_id) => {
    return await Product.findById(_id).lean();
}

module.exports.getAllProduct = async () => {
    return await Product.find({});
}

module.exports.load = async (currentPage, pageLength, category, brand, name) => {
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
    if(name){
        if(!params) params = {};
        params.Name = {$regex : new RegExp(`\\b${name}\\b`, "i")};
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

module.exports.checkProductAvailable = async (category, brand) => {
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

module.exports.updateProduct = async (_id, updates) => {
    return await Product.findByIdAndUpdate(_id, updates);
}