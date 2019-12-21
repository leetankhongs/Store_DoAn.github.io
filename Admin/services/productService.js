const Product = require('../models/productModel');

module.exports.getProductsCount = async (category) => {
    return await Product.countDocuments({TypeProduct: { $regex : new RegExp(category.Type, "i") }});
}

module.exports.load = async (currentPage, pageLength, category) => {
    const skip = currentPage * pageLength;
    let params = null;
    if(category) {
        params = {};
        params.TypeProduct = { $regex : new RegExp(category.Type, "i") };
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