const express = require('express')
const indexController = require('../controllers/indexController')
const drawController = require('../controllers/drawController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/like/:id', indexController.like)
router.get('/user/:id', indexController.profile)
router.get('/draw', drawController.draw)
router.get('/drawing/:id', drawController.drawing)

router.post('/draw', drawController.draw_post)


module.exports = router
