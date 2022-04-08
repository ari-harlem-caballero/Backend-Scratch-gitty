const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res, next) => {
      const { code } = req.query;

      return exchangeCodeForToken(code)
        .then((token) => getGithubProfile(token))
        .then(({ username, email, avatar_url }) => {
          return GithubUser.findByEmail(email);
        })
        .then((user) => {
          if(!user) {
            return GithubUser.insert({
              username,
              email,
              avatar_url
            });
          } else {
            return user;
          }
        })
      }

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1 day' });
      
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS
        })
        .redirect('/api/v1/posts');

    .catch(error => next(error));
  })

  .delete('/', async (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME)
        .json({ success: true, message: 'Signed out successfully!' });

    } catch (err) {
      next(err);
    }
  });
