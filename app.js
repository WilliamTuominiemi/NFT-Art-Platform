const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const auth = require('./routes/auth')
const index = require('./routes/index')
const trade = require('./routes/trade')
const draw = require('./routes/draw')
const settings = require('./routes/settings')
const profile = require('./routes/profile')

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Express app
const app = express()

app.enable("trust proxy");

// Port number
const port = process.env.PORT || '3000'

// Connect to MongoDB
connectDB()

// Register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport and express middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded())

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
    })
)

app.use(bodyParser.json({ limit: '50mb' }))

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/google')
    }
}

app.use('/', index)
app.use('/auth', auth)
app.use('/user', loggedIn, profile)
app.use('/trade', loggedIn, trade)
app.use('/drawing', loggedIn, draw)
app.use('/settings', loggedIn, settings)

app.listen(port, (err) => {
    if (err) throw err
    console.log('Server listening on port', port)
})
