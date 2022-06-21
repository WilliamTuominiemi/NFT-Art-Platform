const express = require('express'), cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
const port = 8080

const passport = require('passport');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const index = require('./routes/index')
const drawing = require('./routes/drawing')
const user = require('./routes/user')
const auth = require('./routes/auth')

// Load config
dotenv.config({ path: './config/.env' })

require('./config/passport')(passport);

const connectDB = require('./config/db')

// Connect to MongoDB
connectDB()

// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
)

// Passport and express middleware
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))

app.use('/drawings', drawing)
app.use('/user', user)
app.use('/auth', auth)
app.use('/', index)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
