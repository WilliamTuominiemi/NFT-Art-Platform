const Drawing = require('../models/image')

const main = (req, res) => {
    Drawing.find()
        //.sort({ likes: -1 })
        .sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        })
}

const drawing = (req,res) => {
    Drawing.find({ _id: req.params.id })
        .then((result) => {
            res.send(result[0])
        })
}

module.exports = {
    main,
    drawing
}
