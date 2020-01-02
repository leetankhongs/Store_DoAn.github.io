const categoryService = require('../services/categoryService');
const productService = require('../services/productService');
const cloudinary = require('cloudinary');
const Product = require('../models/productModel');

const pageLength = 10;
const maxPage = 5;

module.exports.manageProducts = (req, res, next) => {
    const categoryName = req.params.CategoryName;
    const brand = req.query.Brand;
    const productLineName = req.query.Name;
    const currentPage = !req.query.currentPage ? 0 : req.query.currentPage - 1;
    if(currentPage < 0 || isNaN(currentPage)) {
        res.render('error.hbs', {message: "Resource not available"});
        return;
    }

    (async() => {
        //Check legible category
        const category = await categoryService.findCategory(categoryName);
        if(!category){
            res.render('error.hbs', {message: "Category not found"});
            return;
        }
        if(brand && !(await categoryService.checkBrandInCategory(category, brand))) {
            res.render('error.hbs', {message: "Brand not found"});
            return;
        } 

        //Check if page is legible
        const count = await productService.getProductsCount(category, brand, productLineName);
        let totalPages = parseInt(Math.ceil(count/pageLength));
        
        if(totalPages === 0) totalPages = 1;

        if(currentPage >= totalPages) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Get users for current page
        const products = await productService.load(currentPage, pageLength, category, brand, productLineName);
    
        if(!products) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Create pagination
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 
        : currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 - maxPage + 1 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 
        : currentPage <= parseInt(maxPage/2) ? 0 + maxPage - 1: currentPage + parseInt(maxPage/2);

        //Add queries
        //Brand
        let query = brand ? `?Brand=${brand}` : undefined;
        //Product line name
        query = productLineName ? 
            query ? query + `&Name=${productLineName}` : `?Name=${productLineName}`
            : query;

        res.render('GianHang/QLSanPham.hbs', {products, min, max, totalPages, currentPage, category, link: `/categories/${categoryName}/products`, query, currentBrand: brand});
    })(); 
}

module.exports.actionOnProduct = (req, res, next) => {

    const categoryID = req.params.CategoryName;

    if(req.body.edit) {
        loadEditProductPage(res, req.body.edit, categoryID);
        return;
    }

    const deleteID = req.body.delete;
    const recoverID = req.body.recover;

    (async () => {
        if(deleteID) {
            await productService.removeProduct(deleteID);
        }
        if(recoverID){
            await productService.recoverProduct(recoverID);
        }
        res.redirect(req.get('referer'));
    })();
    
}

module.exports.addProduct = async (req, res, next) => {
    const Category = req.params.CategoryName;
    const brands = await categoryService.findListBrandOfCategory(Category);

    res.render("GianHang/SuaSanPham.hbs", {Category,brands: brands});
}

const loadEditProductPage = async (res, productID, Category) => {
    const product = await productService.findProductByID(productID);
    const brands = await categoryService.findListBrandOfCategory(Category);
    res.render("GianHang/SuaSanPham.hbs", {Category, product, brands});
}

module.exports.upsertProductPost = async (req, res, next) => {

    let newProduct = {
        Brand: req.body.Brand,
        Name: req.body.Name,
        SimpleDetail: req.body.SimpleDetail,
        Cost: req.body.Cost,
        TypeProduct: req.body.Category,
        Quantity: req.body.Quantity,
        Description: req.body.Description
    };

    let result = null;
    if(req.file){
        result = await cloudinary.v2.uploader.upload(req.file.path, {folder: req.body.Category + '/' + req.body.Brand} );
        result = result.secure_url;
    }
    newProduct.Image = result;

    if(req.body.ID) {
        await productService.updateProduct(req.body.ID, newProduct);
    }else{
        newProduct = new Product(newProduct);
        await newProduct.save();
    }
   
    res.redirect('/categories/'+ req.body.Category + '/products');
}