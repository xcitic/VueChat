// Auth middleware
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('Unauthenticated')
  }
  else {
    return next()
  }
}

module.exports = authMiddleware;
