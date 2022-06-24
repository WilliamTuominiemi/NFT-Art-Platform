const isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      error: "Unauthenticated request",
    });
  } else {
    next();
  }
};

module.exports = isAuth;
