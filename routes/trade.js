const express = require('express')
const tradeController = require('../controllers/tradeController')

const router = express.Router()

router.get('/s', tradeController.trades)
router.get('/:id', tradeController.trade)

router.post('/accept', tradeController.accept)
router.post('/:id', tradeController.trade_post)

module.exports = router
