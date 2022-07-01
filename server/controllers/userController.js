const User = require('../models/User')

const getProfile = async (req, res) => {
    try {
        if (typeof req.user != 'undefined') {
            const profile = await User.find({ googleId: req.user.googleId })
            res.json(profile[0])
        } else {
            res.json('undefined')
        }
    } catch (err) {
        console.log(err)
    }
}

const getProfileById = async (req, res) => {
    try {
        console.log(req.user)
        if(req.user.googleId === req.params.id) res.json('this')
        else if (typeof req.params.id != 'undefined') {
            const profile = await User.find({ googleId: req.params.id })
            res.json(profile[0])
        } else {
            res.json('undefined')
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProfile,
    getProfileById,
}
