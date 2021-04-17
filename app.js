const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
 
const fs = require('fs')
const path = require('path')

const imgModel = require('./models/model')
const Drawing = require('./models/image')

const port = process.env.PORT || '3000'

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/.env' })

// Passport config
// require('./config/passport')(passport)

// Express app
const app = express()

// Port number
const PORT1 = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// Register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
 
const upload = multer({ storage: storage })

app.get('/', (req, res) => {

    Drawing.find()
    .then((result) => {
        res.render('draw', { title: "Home", drawings: result})
    })

    // imgModel.find({}, (err, items) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send('An error occurred', err)
    //     }
    //     else {
    //         res.render('draw', { title: "Home", items: items })
    //     }
    // });
});

app.post('/', upload.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    console.log()

    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        }
        else {
            // item.save();
            res.redirect('/')
        }
    });
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

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})