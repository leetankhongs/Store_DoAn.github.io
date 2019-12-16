var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
  Brand: {
    type: String,
    require: true
  },
  Name: {
    type: String,
    require: true
  },
  SimpleDetail: {
    type: String,
    require: true
  },
  Cost: {
    type: Number,
    require: true
  },
  Image: {
    type: String,
    require: true
  },
  TypeProduct: {
    type: String,
    require: true
  },
  Quantity: {
    type: Number,
    require: true
  },
  Description: {
    type: String,
    require: false
  },
  Comment: [{name: String, content: String}]
  
}, { collection: 'products' });

module.exports = mongoose.model('products', productSchema);