const Post = require('../models/Post');
const mongoose = require('mongoose');

const verifyPostOwnership = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID.' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'You do not own this post.' });
    }

    req.post = post;
    next();
  } catch (err) {
    console.error('Ownership check failed:', err);
    res.status(500).json({ message: 'Ownership verification failed' });
  }
};

module.exports = verifyPostOwnership;
