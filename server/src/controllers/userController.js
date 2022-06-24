const User = require('../models/User')

const getUser = async (req, res) => res.json(req.user)

const getUserById = async (req, res) => {
  User.findOne({ googleId: req.params.id }).then((user) => {
    res.json(user)
  })
}

module.exports = {
  getUser,
  getUserById,
}
