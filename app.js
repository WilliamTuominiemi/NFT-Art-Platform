const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
 
const fs = require('fs')
const path = require('path')

const Drawing = require('./models/image')

const auth = require('./routes/auth')

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Express app
const app = express()

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

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    Drawing.find()
    .then((result) => {
        res.render('index', { title: "Home", drawings: result})
    })
});

app.get('/draw', (req, res) => {
    res.render('draw', { title: "Draw"})
});

app.post('/image', (req, res) => {
    console.log(req.body.src)

    const obj = {
        src: req.body.src
    }

    Drawing.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    });
})

app.use('/auth', auth)

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})