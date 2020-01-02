let Category = require('../models/categoryModel');
const productService = require('../services/productService');

module.exports.getAllCategories = async () => {
    return await Category.find({});
}

module.exports.checkBrandInCategory = async(categoryObj, brand) => {
    const brands = categoryObj.Brands;
    const regex = new RegExp(`\\b${brand}\\b`, "i");

    for (let i = 0; i < brands.length; i++) {
        if (brands[i].match(regex)) {
            return true;
        }
    }

    return false;
}

module.exports.updateBrandsArray = async (current, toAdd, toDelete, category) => {
    let currentBrands = current;
    //Apply removal
    if(toDelete) { 
        let newState = [];
        for(let count = 0; count < currentBrands.length; count++){
            const regex = new RegExp(`\\b${currentBrands[count]}\\b`, "i");
            let isDeleted = false;
            for(let i = 0; i < toDelete.length; i++) {
                if(toDelete[i].match(regex)){
                    const productsAvailable = await productService.checkProductAvailable(category, currentBrands[count]);
                    if(!productsAvailable) {isDeleted = true;}
                    
                    break;
                }
            }
            if(!isDeleted) {newState.push(currentBrands[count]);}
        }
        currentBrands = newState;
    }

    //Apply added brands
    if(toAdd) {
        const addedBrands = toAdd.filter(x => {
            const regex = new RegExp(`\\b${x}\\b`, "i");
            for(let i = 0 ; i < currentBrands.length; i++) {
                if(currentBrands[i].match(regex)) {return false;}
            }
            return true;
        });
        currentBrands = [...currentBrands, ...addedBrands];
    }
    
    return currentBrands;
}

module.exports.findCategory = async (Type) => {
    return await Category.findOne({Type: { $regex : new RegExp(`\\b${Type}\\b`, "i") }});
} 
module.exports.findListBrandOfCategory = async (Type) => {
    return (await Category.findOne({Type: { $regex : new RegExp(`\\b${Type}\\b`, "i") }})).Brands;
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
    const regex = new RegExp(`\\b${category.Type}\\b`, "i");
    const himself = await Category.findById(_id);
    himself.DisplayName = category.DisplayName;
    himself.Brands = category.Brands;
    if(himself.Type.match(regex)){
        await himself.save();
        return true;
    }else{
        const duplicate = await Category.findOne({Type: { $regex : new RegExp(`\\b${category.Type}\\b`, "i") }});
        if(!duplicate || duplicate._id.equals(_id)) {
            const productsAvailable = await productService.checkProductAvailable(himself, null);
            if(!productsAvailable) {
                himself.Type = category.Type;
                await himself.save();
                return true;
            }
        }
        await himself.save();
    }
    return "Có vấn đề về tính hợp lý của mã gian hàng";
}

module.exports.insertCategory = async (category) => {
    const duplicate = await Category.findOne({Type: { $regex : new RegExp(`\\b${category.Type}\\b`, "i") }});
    if(!duplicate) {
        await Category.create(category);
        return true;
    }
    return false;
}