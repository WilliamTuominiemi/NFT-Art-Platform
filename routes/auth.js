const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/posts' }),
	(req, res) => {
		res.redirect('/profile')
	}
)

router.get('/logout', authController.auth_logout)

module.exports = router
