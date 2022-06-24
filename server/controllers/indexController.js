const Drawing = require('../models/image')

const main = (req, res) => {
    Drawing.find()
        //.sort({ likes: -1 })
        .sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        })
}

const drawing = async (req,res) => {
    try {
        if(typeof req.params.id != 'undefined') {
            const drawing = await Drawing.find({_id: req.params.id})
            res.json(drawing[0])
        }  else {
            res.json('undefined')
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    main,
    drawing
}
