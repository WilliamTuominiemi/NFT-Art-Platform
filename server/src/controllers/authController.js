const logout = (req, res) => {
  req.logout()
  res.redirect(process.env.CLIENT_URL)
}

module.exports = {
  logout,
}
