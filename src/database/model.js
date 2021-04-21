let mongoose = require("mongoose")
let Schema = mongoose.Schema

// Creata BlockChain Schema
let BlockChainSchema = new Schema({

    index: {
        required: true,
        type: Schema.Types.Number,
    },
    timestamp: {
        require: true,
        type: Schema.Types.Date,
        default: Date.now()
    },
    transactions: {
        require: true,
        type: Schema.Types.Array,
    },
    prevHash: {
        require: false,
        type: Schema.Types.String,
    },
    hash: {
        require: true,
        type: Schema.Types.String,
    }
})

module.exports = mongoose.model("BlockChain", BlockChainSchema)