const categoryService = require('../services/categoryService');

const pageLength = 5;
const maxPage = 5;

module.exports.manageCategories = (req, res, next) => {
    const currentPage = !req.query.currentPage ? 0 : req.query.currentPage - 1;
    if(currentPage < 0 || isNaN(currentPage)) {
        res.render('error.hbs', {message: "Resource not available"});
        return;
    }

    (async () => {
        //Check if page is legible
        const count = await categoryService.getCategoriesCount();
        let totalPages = parseInt(Math.ceil(count/pageLength));
        
        if(totalPages === 0) totalPages = 1;

        if(currentPage >= totalPages) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Get users for current page
        const categories = await categoryService.load(currentPage, pageLength);

        if(!categories) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Create pagination
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 
        : currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 - maxPage + 1 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 
        : currentPage <= parseInt(maxPage/2) ? 0 + maxPage - 1: currentPage + parseInt(maxPage/2);
        
        res.render('GianHang/TuyChinh.hbs', {categories, min, max, totalPages, currentPage, link: "/categories"});
    })();  
}

module.exports.actionOnCategory = (req, res, next) => {
    
    if(req.body.edit) {
        loadEditCategoryPage(res, req.body.edit);
        return;
    }
    
    const deleteID = req.body.delete;
    const recoverID = req.body.recover;

    (async () => {
        if(deleteID) {
            await categoryService.removeCategory(deleteID);
        }

        if(recoverID){
            await categoryService.recoverCategory(recoverID); 
        }   
        res.redirect(req.get('referer'));
    })();
    
}

module.exports.addCategory = (req, res, next) => {
    res.render("GianHang/SuaGianHang.hbs");
}

module.exports.upsertCategory = (req, res, next) => {
    (async() => {
        if(req.body.ID){
            const myCategory = await categoryService.findCategoryByID(req.body.ID);
            const currentBrands = myCategory.Brands;
            const addedBrands = req.body.addedBrands;
            const deletedBrands = req.body.deletedBrands ? Array.isArray(req.body.deletedBrands) ? req.body.deletedBrands : 
            [req.body.deletedBrands] : null;
            const final = await categoryService.updateBrandsArray(currentBrands, addedBrands, deletedBrands, myCategory);

            const result = await categoryService.updateCategory(req.body.ID, {Type: req.body.CategoryType, DisplayName: req.body.DisplayName, Brands: final});
            if(result !== true) {
                req.flash('error_msg', result);
            }
        }else{
            const addedBrands = req.body.addedBrands.map(x => {
                let newCase = x.toLowerCase();
                newCase = newCase.charAt(0).toUpperCase() + newCase.slice(1);  
                return newCase;
            });
            const result = await categoryService.insertCategory({Type: req.body.CategoryType, DisplayName: req.body.DisplayName, Brands: addedBrands});
            if(result !== true) {
                req.flash('error_msg', 'Mã nhận diện gian hàng trùng với mã của gian hàng khác');
            }
        }
        res.redirect('/categories');
    })();
}

const loadEditCategoryPage = async (res, categoryID) => {
    const category = await categoryService.findCategoryByID(categoryID);
    res.render("GianHang/SuaGianHang.hbs", {category});
}