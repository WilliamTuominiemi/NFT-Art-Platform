const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/draw', indexController.draw)
router.get('/like/:id', indexController.like)
router.get('/profile/:id', indexController.profile)

router.post('/draw', indexController.draw_post)


module.exports = router
