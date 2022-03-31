const Drawing = require('../models/image')

const main = (req, res) => {
    console.log('request')
    Drawing.find()
        .sort({ likes: -1 })
        .then((result) => {
            res.send(result)
        })
}

module.exports = {
    main,
}
