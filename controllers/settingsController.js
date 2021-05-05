const settings = (req, res) => {
    res.render('settings', {
        title: req.user.displayName,
        user: req.user,
    })
}

module.exports = {
    settings,
}
