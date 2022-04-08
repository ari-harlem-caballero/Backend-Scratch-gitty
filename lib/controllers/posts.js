const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    Post.insert({
      ...req.body,
      username: req.user.username,
      email: req.user.email,
      avatar_url: req.user.avatar_url
    })
      .then((post) => res.send(post))
      .catch((error) => next(error));
  })

  .get('/', authenticate, async (req, res, next) => {
    Post.getAllPosts()
      .then((posts) => res.send(posts))
      .catch((error) => next(error));
  });
