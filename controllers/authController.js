// Logs out
const auth_logout = (req, res) => {
	req.logout()
	res.redirect('/')
}

module.exports = {
	auth_logout,
}
