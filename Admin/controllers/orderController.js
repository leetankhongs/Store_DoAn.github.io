const orderService = require('../services/orderService');

const pageLength = 5;
const maxPage = 5;

module.exports.getOrders = (req, res, next) => {
    const deliveryType = req.query.deliveryType;

    const currentPage = !req.query.currentPage ? 0 : req.query.currentPage - 1;
    if(currentPage < 0 || isNaN(currentPage)) {
        res.render('error.hbs', {message: "Resource not available"});
        return;
    }

    (async() => {
        //Check legible delivery type
        if(deliveryType < 0 || deliveryType > 2){
            res.render('error.hbs', {message: "Wrong delivery type"});
            return;
        }

        //Check if page is legible
        const count = await orderService.getOrdersCount(deliveryType);
        const totalPages = parseInt(Math.ceil(count/pageLength));

        if(currentPage >= totalPages && count > 0) {
            res.render('error.hbs', {message: "Resource not available currentPage"});
            return;
        }

        //Get users for current page
        const orders = await orderService.getOrders(currentPage, pageLength, deliveryType);
    
        if(!orders) {
            res.render('error.hbs', {message: "Resource not available"});
            return;
        }

        //Create pagination
        const min = currentPage <= parseInt(maxPage/2) || totalPages <= maxPage ? 0 
        : currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 - maxPage + 1 : currentPage - parseInt(maxPage/2);
        const max = totalPages <= maxPage || currentPage >= totalPages - 1 - parseInt(maxPage/2) ? totalPages - 1 
        : currentPage <= parseInt(maxPage/2) ? 0 + maxPage - 1: currentPage + parseInt(maxPage/2);
        const query = deliveryType ? `?deliveryType=${deliveryType}` : undefined;

        res.render('DonHang/ListDonHang.hbs', {orders, min, max, totalPages, currentPage, deliveryType, link: "/orders", query});
    })(); 
}

module.exports.changeStateOrder = (req, res, next) => {
    
    const currentID = req.body.currentID;

    //Change delivery state
    const notDelivered = req.body.notDelivered;
    const isDelivering = req.body.isDelivering;
    const isDelivered = req.body.isDelivered;
    const currentDelivery = req.body.currentDelivery;

    let newDelivery = null;
    if(notDelivered) {
        newDelivery = 0;
    }else if (isDelivering) {
        newDelivery = 1;
    } else if (isDelivered) {
        newDelivery = 2;
    }

    if(newDelivery === null
        || currentDelivery === null || currentDelivery === undefined 
        || currentID === null || currentID === undefined
    ) {
        res.render('error.hbs', {message: "Invalid request"});
        return;
    }

    

    if(parseInt(currentDelivery) === parseInt(newDelivery)) {
        res.redirect(req.get('referrer'));
        return;
    }

    (async() => {
        await orderService.changeDelivery(currentID, newDelivery);
        res.redirect(`/orders?deliveryType=${newDelivery}`);
    })();
}