const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (_req, res) => {
    res.redirect(process.env.CLIENT_URL)
  }
)

router.get('/logout', authController.logout)

module.exports = router
