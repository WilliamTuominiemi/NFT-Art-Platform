const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.post('/new', indexController.newDrawing)
router.get('/:id', indexController.drawing)

module.exports = router
