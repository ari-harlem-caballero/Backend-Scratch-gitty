const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    const post = await Post.insert(req.body);

    res.send(post);
  });
