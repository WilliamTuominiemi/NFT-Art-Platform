const express = require('express')
const profileController = require('../controllers/profileController')

const router = express.Router()

router.get('/', profileController.my_profile)
router.get('/:id', profileController.profile)

router.get('/block/:id', profileController.block)
router.get('/unblock/:id', profileController.unblock)

module.exports = router