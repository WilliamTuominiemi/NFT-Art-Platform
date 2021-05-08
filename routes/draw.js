const express = require('express')
const drawController = require('../controllers/drawController')

const router = express.Router()

router.get('/new', drawController.draw)
router.get('/:id', drawController.drawing)

router.post('/new', drawController.draw_post)

module.exports = router
