const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/draw', indexController.draw)
router.get('/trades', indexController.trades)
router.get('/like/:id', indexController.like)
router.get('/user/:id', indexController.profile)
router.get('/trade/:id', indexController.trade)
router.get('/drawing/:id', indexController.drawing)


router.post('/draw', indexController.draw_post)
router.post('/trade/:id', indexController.trade_post)



module.exports = router
