const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/:id', userController.userDrawings)

module.exports = router
