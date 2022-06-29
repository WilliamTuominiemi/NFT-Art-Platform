const mongoose = require('mongoose')

const variables = require('./config')

const uri = variables.MONGO_URI.toString()

const connectDB = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    //Get the default connection
    var db = mongoose.connection

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

module.exports = connectDB
