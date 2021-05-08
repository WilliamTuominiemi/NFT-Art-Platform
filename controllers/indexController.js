const Drawing = require('../models/image')
const User = require('../models/User')

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

const my_profile = (req, res) => {
    if(req.user != undefined) { 
        Drawing.find({ owner_googleId: req.user.googleId })
        .sort({ likes: -1 })
        .then((result) => {
            res.render('my_profile', {
                title: req.user.displayName,
                user: req.user,
                drawings: result,
            })
        })
    }   else    {
        res.redirect('/')
    }
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

const unblock = (req, res) => {
    User.findOneAndUpdate({ googleId: req.user.googleId }, { $pull: { blocked: req.params.id } }).then((result) => {
        res.redirect('/')
    })
}

const rules = (req, res) => {
    res.render('rules', {
        title: 'Rules',
        user: req.user,
    })
}

module.exports = {
    main,
    like,
    profile,
    block,
    my_profile,
    new_first_main,
    old_first_main,
    rules,
    unblock
}
