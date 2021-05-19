const Drawing = require('../models/image')
const User = require('../models/User')

// Render the users own profile
const my_profile = (req, res) => {
    if (req.user != undefined) {
        Drawing.find({ owner_googleId: req.user.googleId })
            .sort({ likes: -1 })
            .then((result) => {
                res.render('my_profile', {
                    title: req.user.displayName,
                    user: req.user,
                    drawings: result,
                })
            })
    } else {
        res.redirect('/')
    }
}

// Render the profile of another user
const profile = (req, res) => {
    User.find({ googleId: req.params.id }).then((result) => {
        Drawing.find({ owner_googleId: req.params.id })
            .sort({ likes: -1 })
            .then((result1) => {
                res.render('profile', {
                    title: result[0].displayName,
                    user: req.user,
                    profile_user: result[0],
                    drawings: result1,
                })
            })
    })
}

// Block user from sending trade requests
const block = (req, res) => {
    User.find({ googleId: req.user.googleId }).then((result) => {
        console.log(result)
        if (result[0].blocked.includes(req.params.id) || req.user.googleId === req.params.id) {
            res.redirect('/settings')
        } else {
            User.findOneAndUpdate({ googleId: req.user.googleId }, { $push: { blocked: req.params.id } }).then(
                (result) => {
                    res.redirect('/settings')
                }
            )
        }
    })
}

// Unblock user
const unblock = (req, res) => {
    User.findOneAndUpdate({ googleId: req.user.googleId }, { $pull: { blocked: req.params.id } }).then((result) => {
        res.redirect('/')
    })
}

module.exports = {
    profile,
    my_profile,
    block,
    unblock,
}
