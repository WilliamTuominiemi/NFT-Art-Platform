var mongoose = require('mongoose')

var drawingSchema = new mongoose.Schema({
    src: {
		type: String,
		required: true,
	},
    owner: {
        googleId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        }     
    },
    artist: {
        googleId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },   
    },
    likes: {
        type: Number,
    },
    likers: {
        type: Array,
    },
}, { timestamps: true });
  
module.exports = new mongoose.model('Drawing', drawingSchema)