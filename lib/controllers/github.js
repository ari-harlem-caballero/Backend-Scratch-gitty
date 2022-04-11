const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', (req, res) => {
    const { code } = req.query;

    let profile;

    return exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then(({ username, email }) => {
        profile = { username, email };
        return GithubUser.findByEmail(email);
      })

      .then((user) => {
        if(!user) {
          return GithubUser.insert(profile);
        } else {
          return user;
        } 
      })
      .then((user) => {
        const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1 day' });
          
        res
          .cookie(process.env.COOKIE_NAME, payload, {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS
          })
          .redirect('/api/v1/posts');
      });
  })

  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
