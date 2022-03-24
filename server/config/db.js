const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

const connectDB = () => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        .then(() => {
            const connection = mongoose.connection
            connection.once('open', () => {
                console.log('MongoDB database connection established successfully')
            })
        })
}

module.exports = connectDB
