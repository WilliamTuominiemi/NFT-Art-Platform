const Drawing = require('../models/image')
const Trade = require('../models/trade')
const User = require('../models/User')

let BlockChain = require('../src/blockChain')
let BlockChainModel = require('../src/database/model')

const main = (req, res) => {
    Drawing.find()
    .sort({ likes: -1 })
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
        Drawing.find({googleId: req.params.id})
        .sort({ likes: -1 })
        .then((result1) => {
            res.render('profile', { title: result[0].displayName, user: req.user, profile_user: result[0], drawings: result1})
        })
    })
}

const draw = (req, res) => {
    res.render('draw', { title: "Draw", user: req.user})
}

const drawing = (req, res) => {
    Drawing.find({_id: req.params.id})
    .then((drawing) => {
        res.render('drawing', {title: "Drawing", user: req.user, drawing: drawing[0]})
    })
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

const mine = (req, res) => {
	if(req.user != undefined)
	{
		console.log(req.body.blockToMine_id)
		const filter = {_id: req.body.blockToMine_id}
		BlockToMine.findOneAndDelete({_id: req.body.blockToMine_id})
		.then((result) => {
			
			let blockChain = new BlockChain()
			
			let PROOF = 420
			blockChain.addNewTransaction(req.user.googleId, req.body.sender_id, req.body.recipient_id, req.body.amount)
			blockChain.addNewBlock(null)
			res.redirect('/mine')
			
		})
	}	else	{
		res.redirect('/')
	}
}

const trade = (req, res) => {
    console.log(req.params.id)
    User.find({googleId: req.params.id})
    .then((receiver) => {
        Drawing.find({googleId: req.user.googleId})
        .then((user_drawings) => {
            Drawing.find({googleId: req.params.id})
            .then((receiver_drawings) => {
                console.log(req.user)
                console.log(receiver)
                res.render('trade', {title: "Trade", user: req.user, receiver: receiver[0], user_drawings, receiver_drawings})
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
    trade.save()
    .then((result) => {
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
	main,
    draw,
    draw_post,
    like,
    profile,
    trade,
    trade_post,
    trades,
    drawing
}