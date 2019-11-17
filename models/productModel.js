var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  Brand: String,
  Name: String,
  SimpleDetail: String,
  Cost: String,
  Image: String,
  TypeProduct: String
}, { collection: 'products' });

module.exports = mongoose.model('products', productSchema);