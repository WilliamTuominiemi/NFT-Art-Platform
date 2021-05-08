const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.main)
router.get('/new', indexController.new_first_main)
router.get('/old', indexController.old_first_main)
router.get('/like/:id', indexController.like)
router.get('/user', indexController.my_profile)
router.get('/rules', indexController.rules)

router.get('/user/block/:id', indexController.block)
router.get('/user/unblock/:id', indexController.unblock)
router.get('/user/:id', indexController.profile)

module.exports = router
