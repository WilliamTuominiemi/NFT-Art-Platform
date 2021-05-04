var mongoose = require('mongoose')

var drawingSchema = new mongoose.Schema(
    {
        src: {
            type: String,
            required: true,
        },
        owner_googleId: {
            type: String,
            required: true,
        },
        owner_displayName: {
            type: String,
            required: true,
        },
        owner_avatar: {
            type: String,
            required: true,
        },
        artist_googleId: {
            type: String,
            required: true,
        },
        artist_displayName: {
            type: String,
            required: true,
        },
        artist_avatar: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
        },
        likers: {
            type: Array,
        },
    },
    { timestamps: true }
)

module.exports = new mongoose.model('Drawing', drawingSchema)
