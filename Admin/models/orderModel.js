var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var orderSchema = new Schema({
    User: {type: Schema.Types.ObjectId, ref: 'users'},
    Cart: {type: Object, required: true},
    Fullname: {type: String, required: true},
    Address: {type: String, required: true},
    Phone: {type: String, required: true},
    Time: {type: Date, required: false, default: Date.now()},
    Delivery: {type: Number, required: false, default: 0 }
})

module.exports = mongoose.model('orders', orderSchema);