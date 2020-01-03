const Order = require('../models/order');

module.exports.findOrderByID = async (id) => {
    return await Order.findById(id);
}