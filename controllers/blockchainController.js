const User = require('../models/User')
let BlockChain = require('../src/blockChain')
let BlockChainModel = require('../src/database/model')

const blockchain = (req, res) => {
    BlockChainModel.find()
        .sort({ timestamp: -1 })
        .then((result) => {
            res.render('blockchain', { title: 'blockchain', user: req.user, blocks: result })
        })
}

module.exports = {
    blockchain,
}
