const Post = require('../models/Post');
const mongoose = require('mongoose');

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newPost = new Post({ title, content, author: authorId });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post.' });
  }
};


// Get all posts
exports.listPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.author && mongoose.Types.ObjectId.isValid(req.query.author)) {
      query.author = req.query.author;
    }

    const posts = await Post.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    console.error('Error listing posts:', error);
    res.status(500).json({ message: 'Failed to retrieve posts.' });
  }
};

// Get single post
exports.getPostDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID.' });
    }

    const post = await Post.findById(id).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error('Error getting post detail:', error);
    res.status(500).json({ message: 'Failed to retrieve post.' });
  }
};

// Update
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    req.post.title = title || req.post.title;
    req.post.content = content || req.post.content;

    await req.post.save();

    res.status(200).json({ message: 'Post updated successfully', post: req.post });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update post.' });
  }
};

// Delete
exports.deletePost = async (req, res) => {
  try {
    await req.post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post.' });
  }
};