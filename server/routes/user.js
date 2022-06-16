const router = require('express').Router()
let User = require('../models/User.js')

const userController = require('../controllers/userController')

router.get('/', userController.getProfile)

router.get('/:id', userController.getProfileById)

module.exports = router