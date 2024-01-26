const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

module.exports = mongoose.model('itemModel', itemSchema);