const express = require('express')
const drawingController = require('../controllers/drawingController')

const router = express.Router()

router.get('/:id', drawingController.drawings)

module.exports = router
