const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
console.log('Value of postController:', postController);
console.log('Type of postController.listPosts:', typeof postController.listPosts);
const authenticate = require('../middleware/auth');
const verifyPostOwnership = require('../middleware/postOwnership');

//Public Routes
router.get('/', postController.listPosts);           
router.get('/:id', postController.getPostDetail);    

//Authenticated Routes
router.post('/', authenticate, postController.createPost); 

//Owner-Only Routes
router.put('/:id', authenticate, verifyPostOwnership, postController.updatePost);   
router.delete('/:id', authenticate, verifyPostOwnership, postController.deletePost); 

module.exports = router;
