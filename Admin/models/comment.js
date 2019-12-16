var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    IDSP:
    {
        type: String,
        require: true
    },
    name:
    {
        type: String,
        require: false
    },
    email:
    {
        type: String,
        require: false
    },
    content:
    {
        type: String,
        require: false
    }
  
}, { collection: 'comment' });

module.exports = mongoose.model('comment', commentSchema);