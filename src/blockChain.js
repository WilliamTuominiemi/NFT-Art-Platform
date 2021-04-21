let hash = require('object-hash')

const TARGET_HASH = hash(100000)

let validator = require("./validator")

let mongoose = require("mongoose")

let blockChainModel = require('./database/model')
let User = require('../models/User')

let chalk = require("chalk")

const mining_reward = 1

class BlockChain {
    constructor() {
        //Create
        this.chain = []

        //Transaction
        this.curr_transactions = []
    }

    getLastBlock(callback)  {
        // Get alst block from DB

        return blockChainModel.findOne({}, null, {sort: { _id: -1 }, limit: 1 }, (err, block) => {
            if(err) return console.error("Cannot find last block")
            return callback(block)
        }) 
    }

    addNewBlock(prevHash) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.curr_transactions,
            prevHash: prevHash,
        }

        console.log(block)

        if(validator.proofOfWork() == TARGET_HASH)  {
            const amount_int = parseInt(block.transactions[0].amount)
            const neg_amount_int = 0 - amount_int

            block.hash = hash(block)

            this.getLastBlock((lastBlock) => {

                if(lastBlock) {
                    block.prevHash = lastBlock.hash
                }

                let newBlockChain = new blockChainModel(block)
                newBlockChain.save((err) => {          
                     if(err) return console.log(chalk.red("Cannot save Block on DB", err.message))
                    console.log(chalk.green("Block saved on DB"))
                })

                User.findOneAndUpdate({ googleId: block.transactions[0].miner }, {$inc : {'crypto' : mining_reward}})
                .then(() => {
                    
                        User.findOneAndUpdate({ googleId: block.transactions[0].recipient }, {$inc : {'crypto' : amount_int}})   
                        .then(() => {
                            //Hash
                            this.hash = hash(block)
                
                            //Add to chain
                            this.chain.push(block)
                            this.curr_transactions = []
                            return block
                        })
                                
                })            
            })      
        }  
    }

    addNewTransaction(miner, sender, recipient, amount) {
        console.log(chalk.green(`miner ${miner}, sender ${sender}, recipient ${recipient}`))
        
        this.curr_transactions.push({
            miner, 
            sender, 
            recipient, 
            amount
        })       
    }
        

    lastBlock() {
        return this.chain.slice(-1)[0]
    }

    isEmpty() {
        return this.chain.lenth == 0
    }
}

module.exports = BlockChain