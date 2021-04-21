const mongoose = require("mongoose") 
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

let BlockChainModel = require("./model")

// Connect to DB
mongoose.connect(process.env.MONGO_URI, (err) => {
    if(err) return console.log("Cannot connect to DB")
    console.log("Database Connected")
    connectionCallback()
})

let connectionCallback = () => {

}

module.exports.onConnect = (callback) => {
    connectionCallback = callback
}