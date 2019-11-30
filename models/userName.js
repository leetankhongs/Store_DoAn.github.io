var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,

    address: String,
    phone: String
  }, { collection: 'users' });
  
  module.exports = mongoose.model('users', userSchema);