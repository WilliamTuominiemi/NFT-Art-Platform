const express = require('express')
const settingsController = require('../controllers/settingsController')

const router = express.Router()

router.get('/', settingsController.settings)
router.get('/blockchain', settingsController.blockchain)
router.get('/block/:id', settingsController.block)

module.exports = router
