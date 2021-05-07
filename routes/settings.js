const express = require('express')
const settingsController = require('../controllers/settingsController')

const router = express.Router()

router.get('/', settingsController.settings)
router.get('/blockchain', settingsController.blockchain)

module.exports = router