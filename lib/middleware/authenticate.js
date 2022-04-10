const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    const payload = jwt.verify(cookie, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    err.status = 401;
    err.message = 'You must be signed in!';
    next(err);
  }
};
