const Drawing = require('../models/image')
const User = require('../models/User')

/*
TODO:::STRUCTURE REVAMP
HOMEPAGE
- View transaction blockchain
- Every drawing
    - Sort by likes, newest first or oldest first
PROFILE
- Create a new drawing
- My owned drawings
- My trades
SETTINGS
- Blocked users
- Profile privacy

TODO:::MAKE SITE LOOK NOT LIKE SHIT
- Bootsrap

TODO:::MAKE BLOCKCHAIN MAKE MORE SENSE
- 2 transactions, 1 for the sender's drawings, 1 for the other's
*/

const main = (req, res) => {
    Drawing.find()
        .sort({ likes: -1 })
        .then((result) => {
            if (req.user === undefined) {
                res.render('index', { title: 'Home', drawings: result, user: 'undefined' })
            } else {
                res.render('index', { title: 'Home', drawings: result, user: req.user })
            }
        })
}

const my_profile = (req, res) => {
    Drawing.find({ owner_googleId: req.user.googleId })
        .sort({ likes: -1 })
        .then((result) => {
            res.render('my_profile', {
                title: req.user.displayName,
                user: req.user,
                drawings: result,
            })
        })
}

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

const like = (req, res) => {
    if (req.user != undefined) {
        Drawing.find({ _id: req.params.id }).then((result) => {
            if (result[0].likers.includes(req.user.googleId)) {
                Drawing.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 } }).then((result1) => {
                    Drawing.findOneAndUpdate({ _id: req.params.id }, { $pull: { likers: req.user.googleId } }).then(
                        (result2) => {
                            res.redirect('/')
                        }
                    )
                })
            } else {
                Drawing.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }).then((result1) => {
                    Drawing.findOneAndUpdate({ _id: req.params.id }, { $push: { likers: req.user.googleId } }).then(
                        (result2) => {
                            res.redirect('/')
                        }
                    )
                })
            }
        })
    } else {
        res.redirect('/auth/google')
    }
}

const block = (req, res) => {
    User.findOneAndUpdate({ googleId: req.user.googleId }, { $push: { blocked: req.params.id } }).then((result) => {
        res.redirect('/')
    })
}

module.exports = {
    main,
    like,
    profile,
    block,
    my_profile,
}
