const express = require('express')
const userController = require('../controllers/userController')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/me', isAuth, userController.getCurrentUser)
router.get('/:id', userController.getUserById)

module.exports = router
