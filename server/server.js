const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port = 8080

const index = require('./routes/index')
const user = require('./routes/user')

// Load config
dotenv.config({ path: './config/.env' })

const connectDB = require('./config/db')

// Connect to MongoDB
connectDB()

app.use(cors())

app.use('/', index)
app.use('/user', user)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
