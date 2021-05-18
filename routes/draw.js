const express = require('express')
const drawController = require('../controllers/drawController')

const router = express.Router()

router.get('/new', drawController.draw) // Drawing page
router.get('/:id', drawController.drawing) // View individual drawing

router.post('/new', drawController.draw_post) // POST drawing to database

module.exports = router
