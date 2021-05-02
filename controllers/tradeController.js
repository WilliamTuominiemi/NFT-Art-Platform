const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

let BlockChain = require('../src/blockChain')
let BlockChainModel = require('../src/database/model')

const trade = (req, res) => {
    if(req.user.googleId === req.params.id) {
        res.redirect('/user/'+req.params.id)
    }   else    {
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
}

const trade_post = (req, res) => {
    if(req.user.googleId === req.params.id) {
        res.redirect('/user/'+req.params.id)
    }   else    {
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
            res.redirect('/trade/s')
        })
    }  
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

const accept = (req, res) => {
    if (req.user != undefined) {
        const filter = { _id: req.body._id }
        let blockChain = new BlockChain()

        const data = {
            sender_drawings: req.body.sender_drawings,
            receiver_drawings: req.body.receiver_drawings,
        }

        let PROOF = 420

        console.log(Array.isArray(data.sender_drawings))
        if(Array.isArray(data.sender_drawings))  {
            console.log("receiver: "+ req.body.receiver+ "drawings" + data.sender_drawings)   
            console.log('array')
            data.sender_drawings.forEach(drawing => {
                Drawing.findOneAndUpdate({_id: drawing}, {googleId: req.body.receiver})
                .then((result) => {
                    // console.log(result)
                })
            })
        }   else {
            console.log("receiver: "+ req.body.receiver+ "drawings" + data.sender_drawings)   
            console.log('not array')
            Drawing.findOneAndUpdate({_id: data.sender_drawings}, {googleId: req.body.receiver})
            .then((result) => {
                // console.log(result)
            })
        }
        
        console.log(Array.isArray(data.receiver_drawings))
        if(Array.isArray(data.receiver_drawings))  {
            console.log("sender: " + req.body.sender + "drawings" + data.receiver_drawings)
            console.log('array')
            data.receiver_drawings.forEach(drawing => {
                Drawing.findOneAndUpdate({_id: drawing}, {googleId: req.body.sender})
                .then((result) => {
                    console.log(result)
                })
            })
        }   else {   
            console.log("sender: " + req.body.sender + "drawings" + data.receiver_drawings)
            console.log('not array')
            Drawing.findOneAndUpdate({_id: data.receiver_drawings}, {googleId: req.body.sender})
            .then((result) => {
                console.log(result)
            })
        }

        Trade.findOneAndDelete(filter)
        .then((result) => {
            console.log(result)
        })

        blockChain.addNewTransaction(req.body.sender, req.body.receiver, data)
        blockChain.addNewBlock(null)
        res.redirect('/trade/s')
    } else {
        res.redirect('/')
    }
}

const decline = (req ,res) => {
    const filter = { _id: req.body._id }
    Trade.findOneAndDelete(filter)
    .then((result) => {
        console.log(result)
        res.redirect('/trade/s')
    })
}

const cancel = (req, res) => {
    const filter = { _id: req.body._id }
    Trade.findOneAndDelete(filter)
    .then((result) => {
        console.log(result)
        res.redirect('/trade/s')
    })
} 

module.exports = {
    trade,
    trade_post,
    trades,
    accept,
    decline,
    cancel
}