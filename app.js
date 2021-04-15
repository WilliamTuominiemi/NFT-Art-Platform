const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
 
const fs = require('fs')
const path = require('path')

const imgModel = require('./model')

const port = process.env.PORT || '3000'

require('dotenv/config')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('connected')
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
app.set("view engine", "ejs");

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
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err)
            res.status(500).send('An error occurred', err)
        }
        else {
            res.render('imagesPage', { items: items })
        }
    });
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

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})