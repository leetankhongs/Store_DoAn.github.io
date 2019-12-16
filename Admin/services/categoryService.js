let Category = require('../models/categoryModel');

module.exports.getAllCategories = async () => {
    return await Category.find({});
}

module.exports.findCategory = async (Type) => {
    return await Category.findOne({Type: { $regex : new RegExp(Type, "i") }});
} 

module.exports.getCategoriesCount = async () => {
    return await Category.estimatedDocumentCount();
}

module.exports.load = async (currentPage, pageLength) => {
    const skip = currentPage * pageLength;
    const categories = await Category.find(null, null, {skip, limit: pageLength}, null);

    return categories;
}