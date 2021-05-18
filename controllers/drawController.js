const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

// Render page where you can draw a drawing
const draw = (req, res) => {
    res.render('draw', { title: 'Draw', user: req.user })
}

// Render individual drawing
const drawing = (req, res) => {
    Drawing.find({ _id: req.params.id }).then((drawing) => {
        res.render('drawing', { title: 'Drawing', user: req.user, drawing: drawing[0] })
    })
}

// POST request for adding a drawing to the db
const draw_post = (req, res) => {
    console.log(req.body)

    const obj = {
        src: req.body.src,
        owner_googleId: req.body.googleId,
        owner_displayName: req.body.name,
        owner_avatar: req.body.avatar,
        artist_googleId: req.body.googleId,
        artist_displayName: req.body.name,
        artist_avatar: req.body.avatar,
        likes: 0,
        likers: [],
        in_trade: false,
    }

    Drawing.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
}

module.exports = {
    draw,
    draw_post,
    drawing,
}
