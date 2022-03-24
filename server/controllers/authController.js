// Logs out
const auth_logout = (req, res) => {
    req.logout()
    res.redirect('http://localhost:3000/')
}

module.exports = {
    auth_logout,
}
