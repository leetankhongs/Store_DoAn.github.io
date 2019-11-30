var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Brand: String,
    Name: String,
    SimpleDetail: String,
    Cost: String,
    Image: String,
    TypeProduct: String,
    Quantity: Number,
    Description: String
  }, { collection: 'products' });
  
  module.exports = mongoose.model('users', userSchema);