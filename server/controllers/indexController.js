const Drawing = require('../models/image')

const main = (req, res) => {
    console.log('request')
    Drawing.find()
        .sort({ likes: -1 })
        .then((result) => {
            console.log(result[0].src)
            res.send(result[0].src)
        })
}

module.exports = {
    main,
}
