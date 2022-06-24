const mongoose = require('mongoose')

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.info('Connected to MongoDB')
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`)
  }
}

module.exports = connectDb
