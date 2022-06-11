const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/:id', indexController.drawing)

module.exports = router
