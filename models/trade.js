var mongoose = require('mongoose')

var tradeSchema = new mongoose.Schema({
    sender_id: {
		type: String,
		required: true,
	},
    receiver_id: {
        type: String,
		required: true,
    },
    sender_drawings: {
        type: Array,
		required: true,
    },
    receiver_drawings: {
        type: Array,
		required: true,
    },
});
  
module.exports = new mongoose.model('Trade', tradeSchema)