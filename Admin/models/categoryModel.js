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
    }
});

module.exports = mongoose.model('category', userSchema);