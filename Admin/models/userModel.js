var mongoose = require('mongoose');

var userSchema= new mongoose.Schema({
    Name: 
    {   type: String,
        require: true
    },
    Email:
    {   type: String,
        require: true
    },
    Password:
    {   type: String,
        require: true
    },
    Address:
    {   type: String,
        require:false
    },
    Phone: 
    {   type: String,
        require:true
    },
    Cart:
    {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('users', userSchema);