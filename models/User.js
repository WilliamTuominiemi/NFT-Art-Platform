const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    blocked: {
        type: Array,
    },
    privacy: {
        type: Number,
    },
    strikes: {
        type: Number,
    },
})

module.exports = mongoose.model('User', UserSchema)
