const mongoose = require('mongoose')

const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI, { // 'mongodb://127.0.0.1:27017'
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log('connected to db')
		})
		.catch((err) => {
			console.error(err)
			process.exit(1)
		})
}

module.exports = connectDB