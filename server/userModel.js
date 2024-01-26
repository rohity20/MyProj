const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "name": {
        type: String
    },
    "email": {
        type: String
    },
    "dob": {
        type: Date
    },
    "password": {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

module.exports = mongoose.model('userModel', userSchema);