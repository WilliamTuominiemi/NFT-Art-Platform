const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

let BlockChain = require('../src/blockChain')
let BlockChainModel = require('../src/database/model')

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

const profile = (req, res) => {
    User.find({ googleId: req.params.id }).then((result) => {
        Drawing.find({ googleId: req.params.id })
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

const mine = (req, res) => {
    if (req.user != undefined) {
        console.log(req.body.blockToMine_id)
        const filter = { _id: req.body.blockToMine_id }
        BlockToMine.findOneAndDelete({ _id: req.body.blockToMine_id }).then((result) => {
            let blockChain = new BlockChain()

            let PROOF = 420
            blockChain.addNewTransaction(req.user.googleId, req.body.sender_id, req.body.recipient_id, req.body.amount)
            blockChain.addNewBlock(null)
            res.redirect('/mine')
        })
    } else {
        res.redirect('/')
    }
}



module.exports = {
    main,
    like,
    profile,
}
