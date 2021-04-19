var mongoose = require('mongoose')

var drawingSchema = new mongoose.Schema({
    src: {
		type: String,
		required: true,
	},
    googleId: {
        type: String,
		required: true,
    },
    name: {
        type: String,
		required: true,
    },
    avatar: {
        type: String,
		required: true,
    },
    likes: {
        type: Number,
    },
    likers: {
        type: Array,
    },
});
  
module.exports = new mongoose.model('Drawing', drawingSchema)