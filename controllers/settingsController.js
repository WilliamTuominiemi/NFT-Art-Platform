let BlockChainModel = require('../src/database/model')
const User = require('../models/User')

// Render settings page
const settings = (req, res) => {
    res.render('settings', {
        title: req.user.displayName,
        user: req.user,
    })
}

// Render blockchain
const blockchain = (req, res) => {
    BlockChainModel.find()
        .sort({ timestamp: -1 })
        .then((result) => {
            res.render('blockchain', { title: 'blockchain', user: req.user, blocks: result })
        })
}

// Render individual block in blockchain
const block = (req, res) => {
    BlockChainModel.find({ hash: req.params.id }).then((result) => {
        res.render('blockchain', { title: 'blockchain', user: req.user, blocks: result })
    })
}

// Update profile privacy
const privacy = (req, res) => {
    User.findOneAndUpdate(
        { googleId: req.user.googleId },
        {
            privacy: req.body.privacy,
        }
    ).then((result) => {
        res.redirect('/settings')
    })
}

module.exports = {
    settings,
    blockchain,
    block,
    privacy,
}
