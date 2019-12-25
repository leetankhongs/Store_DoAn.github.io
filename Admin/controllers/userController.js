let userService = require("../services/userService");

const pageLength = 10;
const maxPage = 5;

module.exports.loadUsers = (req, res, next) => {
    const currentPage = !req.query.currentPage ? 0 : req.query.currentPage - 1;
    if(currentPage < 0 || isNaN(currentPage)) {
        res.render('error.hbs', {message: "Resource not available"});
        return;
    }

    (async () => {
        //Check if page is legible
        const totalPages = parseInt((await userService.getUsersCount())/pageLength) + 1;
        
        if(currentPage >= totalPages) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Get users for current page
        const users = await userService.load(currentPage, pageLength);
       
        if(!users) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Create pagination
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= parseInt(totalPages - maxPage/2) ? totalPages - 1 : currentPage + parseInt(maxPage/2);

        res.render('NguoiDung/ListNguoiDung.hbs', {users, min, max, totalPages, currentPage, link: "/users"});
    })();  
}

module.exports.actionOnUser = (req, res, next) => {
    const deleteID = req.body.delete;
    const recoverID = req.body.recover;

    if(deleteID) {
        (async () => {
            await userService.removeUser(deleteID);
        })();
    }

    if(recoverID){
        (async () => {
            await userService.recoverUser(recoverID);
        })();
    }

    res.redirect(req.get('referer'));
}