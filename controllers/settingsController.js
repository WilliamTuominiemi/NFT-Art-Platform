let BlockChainModel = require('../src/database/model')

const settings = (req, res) => {
    res.render('settings', {
        title: req.user.displayName,
        user: req.user,
    })
}

const blockchain = (req, res) => {
    BlockChainModel.find()
        .sort({ timestamp: -1 })
        .then((result) => {
            res.render('blockchain', { title: 'blockchain', user: req.user, blocks: result })
        })
}

module.exports = {
    settings,
    blockchain,
}
