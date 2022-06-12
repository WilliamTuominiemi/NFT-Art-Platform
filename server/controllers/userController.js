const Drawing = require('../models/image')

const user = (req,res) => {
    Drawing.find({ owner_googleId: req.params.id })
        .sort({ likes: -1 })
        .then((result) => {
            res.send(result)
        })
}

module.exports = {
    user
}
