const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
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
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);

      const profileResponse = await getGithubProfile(token);

      let user = await GithubUser.findByEmail(profileResponse.email);

      if(!user) {
        user = await GithubUser.insert({
          username: profileResponse.login,
          email: profileResponse.email,
          avatar_url: profileResponse.avatar_url
        });
      }

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1 day' });
      
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS
        })
        .redirect('/api/v1/posts');

    } catch (err) {
      next(err);
    }
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
