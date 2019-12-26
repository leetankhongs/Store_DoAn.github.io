const categoryService = require('../services/categoryService');
const productService = require('../services/productService');

const pageLength = 10;
const maxPage = 5;

module.exports.manageProducts = (req, res, next) => {
    const categoryName = req.params.CategoryName;
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

        //Check if page is legible
        const totalPages = parseInt((await productService.getProductsCount(category))/pageLength) + 1;
        
        if(currentPage >= totalPages) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Get users for current page
        const products = await productService.load(currentPage, pageLength, category);
    
        if(!products) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Create pagination
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= parseInt(totalPages - maxPage/2) ? totalPages - 1 : currentPage + parseInt(maxPage/2);

        res.render('GianHang/QLSanPham.hbs', {products, min, max, totalPages, currentPage, category, link: `/categories/${categoryName}/products`});
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

module.exports.addProduct = (req, res, next) => {
    const Category = req.params.CategoryName;
    res.render("GianHang/SuaSanPham.hbs", {Category});
}

module.exports.upsertProduct = (req, res, next) => {

}

const loadEditProductPage = async (res, productID, Category) => {
    const product = await productService.findProductByID(productID);
    res.render("GianHang/SuaSanPham.hbs", {Category, product});
}