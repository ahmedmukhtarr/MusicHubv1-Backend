// routes/postRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createPost, getAllPosts, getPost, updatePost, deletePost, addComment, likePost, unlikePost } = require('../controllers/postFeedController');

// Middleware to check if the user is authenticated
const authenticateUser = passport.authenticate('jwt', { session: false });

router.post('/create', authenticateUser, createPost);
router.get('/getAll', authenticateUser, getAllPosts);
router.get('/get/:postId', authenticateUser, getPost);
router.put('/update/:postId', authenticateUser, updatePost);
router.delete('/delete/:postId', authenticateUser, deletePost);
router.post('/add/comment/:postId', authenticateUser, addComment);
router.post('/like/:postId', authenticateUser, likePost);
router.post('/unlike/:postId', authenticateUser, unlikePost);

module.exports = router;