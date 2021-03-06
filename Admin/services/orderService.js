const Order = require('../models/orderModel');

module.exports.getOrdersCount = async (Delivery) => {
    if(Delivery !== null && Delivery !== undefined) {
        return await Order.countDocuments({Delivery});
    }
    return await Order.estimatedDocumentCount();
}

module.exports.getOrders = async (currentPage, pageLength, deliveryState, _id) => {
    const skip = currentPage * pageLength;
    let params = null;
    if(_id) {
        return await Order.findById(_id);
    }

    if(deliveryState !== null && deliveryState !== undefined) {
        params = {};
        params.Delivery = deliveryState;
    }
    const products = await Order.find(params, null, {skip, limit: pageLength}, null);

    return products;
}

module.exports.getOrdersToday = async () => {
    const orders = await Order.find({});
    const ordersToday =[];
    const today = new Date(Date.now());

    for(var i=0; i < orders.length; i++)
    {
        const time = new Date(orders[i].Time);
        if(today.getDate() === time.getDate() && today.getMonth() === time.getMonth() && today.getFullYear() === time.getFullYear())
        {
            ordersToday.push(orders[i]);
        }
    }

    return ordersToday;
}

module.exports.getAllOrders = async (deliveryState) => {
    let params = null;
    if(deliveryState !== null && deliveryState !== undefined) {
        params = {};
        if(Array.isArray(deliveryState))
            { params.Delivery = { "$in": deliveryState }; }
        else
            { params.Delivery = deliveryState; }
    }
    const products = await Order.find(params);

    return products;
}

module.exports.changeDelivery = async (_id, deliveryState) => {
    return await Order.findByIdAndUpdate(_id, {Delivery: deliveryState});
}

module.exports.getAllSucessOrder = async ()=>{
    return await Order.find({});
}