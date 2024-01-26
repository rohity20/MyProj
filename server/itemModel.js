const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('itemModel', itemSchema);