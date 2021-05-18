const express = require('express')
const tradeController = require('../controllers/tradeController')

const router = express.Router()

router.get('/s', tradeController.trades) // View incoming/outgoing trade offers
router.get('/:id', tradeController.trade) // View trade offer by id

router.post('/cancel', tradeController.cancel) // Cancel outgoing trade offer
router.post('/decline', tradeController.decline) // Decline incoming trade offer
router.post('/accept', tradeController.accept) // Accept incoming trade offer
router.post('/:id', tradeController.trade_post) // Create new trade offer

module.exports = router
