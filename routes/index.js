const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/new', indexController.new_first_main)
router.get('/old', indexController.old_first_main)
router.get('/like/:id', indexController.like)
router.get('/rules', indexController.rules)

module.exports = router
 