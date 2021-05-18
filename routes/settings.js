const express = require('express')
const settingsController = require('../controllers/settingsController')

const router = express.Router()

router.get('/', settingsController.settings) // Settings page
router.get('/blockchain', settingsController.blockchain) // View blockchain
router.get('/block/:id', settingsController.block) // View individual block

router.post('/privacy', settingsController.privacy) // Set profile trade privacy

module.exports = router
