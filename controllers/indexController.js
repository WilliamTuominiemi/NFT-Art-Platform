const Drawing = require('../models/image')
const User = require('../models/User')

// Render homepage, with the highest rated image on top
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

// Render homepage, but the newest images first
const new_first_main = (req, res) => {
    Drawing.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            if (req.user === undefined) {
                res.render('index', { title: 'Home', drawings: result, user: 'undefined' })
            } else {
                res.render('index', { title: 'Home', drawings: result, user: req.user })
            }
        })
}

// Render homepage, but the oldest images first
const old_first_main = (req, res) => {
    Drawing.find()
        .sort({ createdAt: 1 })
        .then((result) => {
            if (req.user === undefined) {
                res.render('index', { title: 'Home', drawings: result, user: 'undefined' })
            } else {
                res.render('index', { title: 'Home', drawings: result, user: req.user })
            }
        })
}

// Like drawing and remove like
const like = (req, res) => {
    if (req.user != undefined) {
        Drawing.find({ _id: req.params.id }).then((result) => {
            // Check if user has already liked drawing
            if (result[0].likers.includes(req.user.googleId)) {
                // Remove like
                Drawing.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 } }).then((result1) => {
                    Drawing.findOneAndUpdate({ _id: req.params.id }, { $pull: { likers: req.user.googleId } }).then(
                        (result2) => {
                            res.redirect('/')
                        }
                    )
                })
            } else {
                // Add like
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

// Render the rules of the website
const rules = (req, res) => {
    res.render('rules', {
        title: 'Rules',
        user: req.user,
    })
}

module.exports = {
    main,
    like,
    new_first_main,
    old_first_main,
    rules,
}
