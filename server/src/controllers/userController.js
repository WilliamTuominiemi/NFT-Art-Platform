const User = require('../models/User')

const getCurrentUser = (req, res) => res.json(req.user)

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate('drawings')
  return res.json(user)
}

module.exports = {
  getCurrentUser,
  getUserById,
}
