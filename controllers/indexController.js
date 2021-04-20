const Drawing = require('../models/image')
const User = require('../models/User')

const main = (req, res) => {
    Drawing.find()
    .then((result) => {
        if(req.user === undefined) {
            res.render('index', { title: "Home", drawings: result, user: "undefined"})
        }   else    {
            res.render('index', { title: "Home", drawings: result, user: req.user})
        }
    })
}

const profile = (req, res) => {
    User.find({googleId: req.params.id})
    .then((result) => {
        const user = result[0]
        Drawing.find({googleId: user.googleId})
        .then((result1) => {
            console.log("drawings: " + result1)
            res.render('profile', { title: user.displayName, profile_user: user, user: req.user, drawings: result1})
        })
    })
}

const draw = (req, res) => {
    res.render('draw', { title: "Draw", user: req.user})
}

const like = (req, res) => {
    if(req.user != undefined)   {
        Drawing.find({_id: req.params.id})
        .then((result) => {
            if(result[0].likers.includes(req.user.googleId))    {
                Drawing.findOneAndUpdate({_id: req.params.id}, {$inc : {'likes' : -1}})
                .then((result1) => {
                    Drawing.findOneAndUpdate({_id: req.params.id}, { $pull: { 'likers': req.user.googleId }})
                    .then((result2) => {
                        res.redirect('/')
                    })
                })
            }   else    {
                Drawing.findOneAndUpdate({_id: req.params.id}, {$inc : {'likes' : 1}})
                .then((result1) => {
                    Drawing.findOneAndUpdate({_id: req.params.id}, { $push: { 'likers': req.user.googleId }})
                    .then((result2) => {
                        res.redirect('/')
                    })
                })
            }
        })
    }   else    {
        res.redirect('/auth/google')
    }    
}

const draw_post = (req, res) => {
    console.log(req.body)

    const obj = {
        src: req.body.src,
        googleId: req.body.googleId,
        name: req.body.name,
        avatar: req.body.avatar,
        likes: 0,
        likers: [],
    }

    Drawing.create(obj, (err, item) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
}

module.exports = {
	main,
    draw,
    draw_post,
    like,
    profile
}