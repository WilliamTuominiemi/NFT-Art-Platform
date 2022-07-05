const Drawing = require('../models/image')

const main = (req, res) => {
    Drawing.find()
        //.sort({ likes: -1 })
        .sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        })
}

const drawing = async (req, res) => {
    try {
        if (typeof req.params.id != 'undefined') {
            const drawing = await Drawing.find({ _id: req.params.id })
            res.json(drawing[0])
        } else {
            res.json('undefined')
        }
    } catch (err) {
        console.log(err)
    }
}

const newDrawing = (req,res) => {
    const obj = {
        src: req.body.img,
        owner_googleId: req.user.googleId,
        owner_displayName: req.user.displayName,
        owner_avatar: req.user.image,
        artist_googleId: req.user.googleId,
        artist_displayName: req.user.displayName,
        artist_avatar: req.user.image,
        likes: 0,
        likers: [],
        in_trade: false,
    }

    Drawing.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        } else {
            console.log(item)
        }
    })
}

module.exports = {
    main,
    drawing,
    newDrawing
}
