const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

const trade = (req, res) => {
    // console.log(req.params.id)
    User.find({ googleId: req.params.id }).then((receiver) => {
        Drawing.find({ googleId: req.user.googleId }).then((user_drawings) => {
            Drawing.find({ googleId: req.params.id }).then((receiver_drawings) => {
                // console.log(req.user)
                // console.log(receiver)
                res.render('trade', {
                    title: 'Trade',
                    user: req.user,
                    receiver: receiver[0],
                    user_drawings,
                    receiver_drawings,
                })
            })
        })
    })
}

const trade_post = (req, res) => {
    console.log(req.body)

    const body = {
        sender_id: req.user.googleId,
        receiver_id: req.params.id,
        sender_drawings: req.body.sender_drawings,
        receiver_drawings: req.body.receiver_drawings,
    }

    let trade = new Trade(body)
    trade.save().then((result) => {
        console.log(result)
        res.redirect('/trades')
    })
}

const trades = (req, res) => {
    Trade.find({receiver_id: req.user.googleId})
    .then((incoming) => {
        Trade.find({sender_id: req.user.googleId})
        .then((outgoing) => {
            res.render('trades', {title: "trades", user: req.user, incoming, outgoing})
        })
    })
}


module.exports = {
    trade,
    trade_post,
    trades,
}