const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    Post.insert({
      ...req.body,
      username: req.user.username,
    })
      .then((post) => res.send(post))
      .catch(next);
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAllPosts();

      res.send(posts);
    } catch (err) {
      next(err);
    }
  });
