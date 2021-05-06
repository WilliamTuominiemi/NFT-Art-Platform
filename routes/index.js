const express = require('express')
const indexController = require('../controllers/indexController')
const drawController = require('../controllers/drawController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/new', indexController.new_first_main)
router.get('/old', indexController.old_first_main)
router.get('/like/:id', indexController.like)
router.get('/user', indexController.my_profile)

router.get('/user/block/:id', indexController.block)
router.get('/user/:id', indexController.profile)
router.get('/draw', drawController.draw)
router.get('/drawing/:id', drawController.drawing)

router.post('/draw', drawController.draw_post)

module.exports = router
