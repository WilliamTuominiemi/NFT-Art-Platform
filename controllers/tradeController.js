const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

let BlockChain = require('../src/blockChain')
let BlockChainModel = require('../src/database/model')

// Each trade document has a inTrade: true to check if it is already in a trade.

/* 
To minimalize spam, you can block people from sending trade requests and put on an option
where you can set your trading private, then no one can send you trade requests.
*/

const trade = (req, res) => {
    if (req.user.googleId === req.params.id) {
        res.redirect('/user/' + req.params.id)
    } else {
        // console.log(req.params.id)
        User.find({ googleId: req.params.id }).then((receiver) => {
            Drawing.find({ owner_googleId: req.user.googleId }).then((user_drawings) => {
                Drawing.find({ owner_googleId: req.params.id }).then((receiver_drawings) => {
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
}

async function set_trade_state(drawings) {
    if (Array.isArray(drawings)) {
        for (const drawing of drawings) {
            console.log(drawing)
            Drawing.findOneAndUpdate({ _id: drawing }, { in_trade: true }).then((result) => {
                // console.log(result)
            })
        }
    } else {
        console.log(drawings)
        Drawing.findOneAndUpdate({ _id: drawings }, { in_trade: true }).then((result) => {
            // console.log(result)
        })
    }
}

const trade_post = (req, res) => {
    if (req.user.googleId === req.params.id) {
        res.redirect('/user/' + req.params.id)
    } else {
        console.log(req.body)

        const body = {
            sender_id: req.user.googleId,
            receiver_id: req.params.id,
            sender_drawings: req.body.sender_drawings,
            receiver_drawings: req.body.receiver_drawings,
        }

        let trade = new Trade(body)

        set_trade_state(req.body.sender_drawings).then(() => {
            set_trade_state(req.body.receiver_drawings).then(() => {
                trade.save().then((result) => {
                    res.redirect('/trade/s')
                })
            })
        })
    }
}

const trades = (req, res) => {
    Trade.find({ receiver_id: req.user.googleId }).then((incoming) => {
        Trade.find({ sender_id: req.user.googleId }).then((outgoing) => {
            res.render('trades', { title: 'trades', user: req.user, incoming, outgoing })
        })
    })
}

const accept = (req, res) => {
    if (req.user != undefined) {
        const filter = { _id: req.body._id }
        let blockChain = new BlockChain()

        const data = {
            sender_drawings: req.body.sender_drawings,
            receiver_drawings: req.body.receiver_drawings,
        }

        let PROOF = 420

        User.find({ googleId: req.body.receiver }).then((user_) => {
            console.log(Array.isArray(data.sender_drawings))
            if (Array.isArray(data.sender_drawings)) {
                console.log('receiver: ' + req.body.receiver + 'drawings' + data.sender_drawings)
                console.log('array')
                data.sender_drawings.forEach((drawing) => {
                    Drawing.findOneAndUpdate(
                        { _id: drawing },
                        {
                            owner_googleId: req.body.receiver,
                            owner_displayName: user_[0].displayName,
                            owner_avatar: user_[0].image,
                            in_trade: false,
                        }
                    ).then((result) => {
                        console.log(result)
                    })
                })
            } else {
                console.log('receiver: ' + req.body.receiver + 'drawings' + data.sender_drawings)
                console.log('not array')
                Drawing.findOneAndUpdate(
                    { _id: data.sender_drawings },
                    {
                        owner_googleId: req.body.receiver,
                        owner_displayName: user_[0].displayName,
                        owner_avatar: user_[0].image,
                        in_trade: false,
                    }
                ).then((result) => {
                    console.log(result)
                })
            }
        })

        User.find({ googleId: req.body.sender }).then((user_) => {
            console.log(Array.isArray(data.receiver_drawings))
            if (Array.isArray(data.receiver_drawings)) {
                console.log('sender: ' + req.body.sender + 'drawings' + data.receiver_drawings)
                console.log('array')
                data.receiver_drawings.forEach((drawing) => {
                    Drawing.findOneAndUpdate(
                        { _id: drawing },
                        {
                            owner_googleId: req.body.sender,
                            owner_displayName: user_[0].displayName,
                            owner_avatar: user_[0].image,
                            in_trade: false,
                        }
                    ).then((result) => {
                        console.log(result)
                    })
                })
            } else {
                console.log('sender: ' + req.body.sender + 'drawings' + data.receiver_drawings)
                console.log('not array')
                Drawing.findOneAndUpdate(
                    { _id: data.receiver_drawings },
                    {
                        owner_googleId: req.body.sender,
                        owner_displayName: user_[0].displayName,
                        owner_avatar: user_[0].image,
                        in_trade: false,
                    }
                ).then((result) => {
                    console.log(result)
                })
            }
        })

        Trade.findOneAndDelete(filter).then((result) => {
            console.log(result)
        })

        blockChain.addNewTransaction(req.body.sender, req.body.receiver, data)
        blockChain.addNewBlock(null)
        res.redirect('/trade/s')
    } else {
        res.redirect('/')
    }
}

async function set_trade_state_false(drawings) {
    if (Array.isArray(drawings)) {
        for (const drawing of drawings) {
            console.log(drawing)
            Drawing.findOneAndUpdate({ _id: drawing }, { in_trade: false }).then((result) => {
                // console.log(result)
            })
        }
    } else {
        console.log(drawings)
        Drawing.findOneAndUpdate({ _id: drawings }, { in_trade: false }).then((result) => {
            // console.log(result)
        })
    }
}

const decline = (req, res) => {
    const filter = { _id: req.body._id }
    Trade.findOneAndDelete(filter).then((result) => {
        set_trade_state_false(result.sender_drawings).then(() => {
            set_trade_state_false(result.receiver_drawings).then(() => {
                res.redirect('/trade/s')
            })
        })
    })
}

const cancel = (req, res) => {
    const filter = { _id: req.body._id }
    Trade.findOneAndDelete(filter).then((result) => {
        set_trade_state_false(result.sender_drawings).then(() => {
            set_trade_state_false(result.receiver_drawings).then(() => {
                res.redirect('/trade/s')
            })
        })
    })
}

module.exports = {
    trade,
    trade_post,
    trades,
    accept,
    decline,
    cancel,
}
