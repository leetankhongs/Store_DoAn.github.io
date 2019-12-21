let Category = require('../models/categoryModel');
const productService = require('../services/productService');

module.exports.getAllCategories = async () => {
    return await Category.find({});
}

module.exports.findCategory = async (Type) => {
    return await Category.findOne({Type: { $regex : new RegExp(Type, "i") }});
} 

module.exports.findCategoryByID = async(_id) => {
    return await Category.findById(_id);
}

module.exports.getCategoriesCount = async () => {
    return await Category.estimatedDocumentCount();
}

module.exports.load = async (currentPage, pageLength) => {
    const skip = currentPage * pageLength;
    const categories = await Category.find(null, null, {skip, limit: pageLength}, null);

    return categories;
}

module.exports.removeCategory = async (_id) => {
    return await Category.findByIdAndUpdate(_id, {isDelete: true});
}

module.exports.recoverCategory = async (_id) => {
    return await Category.findByIdAndUpdate(_id, {isDelete: false});
}

module.exports.updateCategory = async (_id, category) => {
    if(!category) return "Không có dữ liệu vào";
    if(!category.Type || !category.DisplayName) return "Thiếu tham số bắt buộc";
    const himself = await Category.findById(_id);
    const duplicate = await Category.findOne({Type: { $regex : new RegExp(category.Type, "i") }});
    if(!duplicate || duplicate._id.equals(_id)) {
        const productsCount = himself.productAmount;
        if(productsCount === 0) {
            await Category.findByIdAndUpdate(_id, category);
            return true;
        }
    }
    return "Có vấn đề về tính hợp lý của dữ liệu nhập";
}

module.exports.insertCategory = async (category) => {
    const duplicate = await Category.findOne({Type: { $regex : new RegExp(category.Type, "i") }});
    if(!duplicate) {
        return await Category.create(category);
    }
    return false;
}