var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Type: 
    {   type: String,
        required: true
    },
    DisplayName: 
    {
        type: String,
        required: true,
    },
    Brands: 
    {
        type: [String],
        default: []
    },
    isDelete: 
    {
        type: Boolean,
        default: false,
        required: false,
    },
    productAmount:
    {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('category', userSchema);