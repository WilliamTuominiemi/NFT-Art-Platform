const express = require('express')
const indexController = require('../controllers/indexController')
const tradeController = require('../controllers/tradeController')
const drawController = require('../controllers/drawController')



const router = express.Router()

router.get('/', indexController.main)
router.get('/like/:id', indexController.like)
router.get('/user/:id', indexController.profile)

router.get('/draw', drawController.draw)
router.get('/drawing/:id', drawController.drawing)

router.get('/trades', tradeController.trades)
router.get('/trade/:id', tradeController.trade)

router.post('/draw', drawController.draw_post)

router.post('/trade/:id', tradeController.trade_post)



module.exports = router
