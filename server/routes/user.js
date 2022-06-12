const express = require('express')
const indexController = require('../controllers/userController')

const router = express.Router()

router.get('/:id', userController.drawing)

module.exports = router
