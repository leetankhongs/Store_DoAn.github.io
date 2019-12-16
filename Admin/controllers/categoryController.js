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
        const totalPages = parseInt((await categoryService.getCategoriesCount())/pageLength) + 1;
        
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
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= parseInt(totalPages - maxPage/2) ? totalPages - 1 : currentPage + parseInt(maxPage/2); 

        res.render('GianHang/TuyChinh.hbs', {categories, min, max, totalPages, currentPage, link: "/categories"});
    })();  
}