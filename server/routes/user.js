const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/:id', userController.user)

module.exports = router
