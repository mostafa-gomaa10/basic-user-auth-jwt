const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);