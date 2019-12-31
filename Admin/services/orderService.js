const Order = require('../models/orderModel');

module.exports.getOrdersCount = async (Delivery) => {
    if(Delivery !== null && Delivery !== undefined) {
        return await Order.countDocuments({Delivery});
    }
    return await Order.estimatedDocumentCount();
}

module.exports.getOrders = async (currentPage, pageLength, deliveryState) => {
    const skip = currentPage * pageLength;
    let params = null;
    if(deliveryState !== null && deliveryState !== undefined) {
        params = {};
        params.Delivery = deliveryState;
    }
    const products = await Order.find(params, null, {skip, limit: pageLength}, null);

    return products;
}

module.exports.changeDelivery = async (_id, deliveryState) => {
    return await Order.findByIdAndUpdate(_id, {Delivery: deliveryState});
}