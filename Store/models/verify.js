var mongoose = require('mongoose');

var verify= new mongoose.Schema({
    Email: 
    {
        type: String,
        require: true
    },
    Code:
    {
        type: Number,
        require: true
    }
    
});

module.exports = mongoose.model('verifies', verify);