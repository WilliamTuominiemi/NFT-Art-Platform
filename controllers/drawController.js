const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

const draw = (req, res) => {
    res.render('draw', { title: 'Draw', user: req.user })
}

const drawing = (req, res) => {
    Drawing.find({ _id: req.params.id }).then((drawing) => {
        res.render('drawing', { title: 'Drawing', user: req.user, drawing: drawing[0] })
    })
}

const draw_post = (req, res) => {
    console.log(req.body)

    const obj = {
        src: req.body.src,
        googleId: req.body.googleId,
        name: req.body.name,
        avatar: req.body.avatar,
        likes: 0,
        likers: [],
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