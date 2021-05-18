const express = require('express')
const profileController = require('../controllers/profileController')

const router = express.Router()

router.get('/', profileController.my_profile) // View users own profile
router.get('/:id', profileController.profile) // View other users profile by ID

// Block and unblock other user by their ID
router.get('/block/:id', profileController.block)
router.get('/unblock/:id', profileController.unblock)

module.exports = router
