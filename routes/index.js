const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main) // home page, sort by top
router.get('/new', indexController.new_first_main) // home page, sort by new
router.get('/old', indexController.old_first_main) // home page, sort by old
router.get('/like/:id', indexController.like) // Like/unlike drawing
router.get('/rules', indexController.rules) // View site rules

module.exports = router
