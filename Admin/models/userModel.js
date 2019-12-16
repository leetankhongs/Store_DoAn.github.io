var mongoose = require('mongoose');

var userSchema= new mongoose.Schema({
    Name: 
    {   type: String,
        required: true
    },
    Email:
    {   type: String,
        required: true
    },
    Password:
    {   type: String,
        required: true
    },
    Address:
    {   type: String,
        required:false
    },
    Phone: 
    {   type: String,
        required:true
    },
    Cart:
    {
        type: Object,
        required: false
    },
    isDelete: 
    {
        type: Boolean,
        default: false,
        required: false,
    }
});

module.exports = mongoose.model('users', userSchema);