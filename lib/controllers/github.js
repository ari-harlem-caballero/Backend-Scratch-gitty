const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await GithubService.create(req.query.code);
      
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
