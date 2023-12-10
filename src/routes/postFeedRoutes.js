// routes/postRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createPost, getAllPosts, getPost, updatePost, deletePost, addComment, likePost, unlikePost } = require('../controllers/postFeedController');

// Middleware to check if the user is authenticated
const authenticateUser = passport.authenticate('jwt', { session: false });

router.post('/create', createPost);
router.get('/getAll', getAllPosts);
router.get('/get/:postId', getPost);
router.put('/update/:postId', updatePost);
router.delete('/delete/:postId', deletePost);
router.post('/add/comment/:postId', addComment);
router.post('/like/:postId', likePost);
router.post('/unlike/:postId', unlikePost);

module.exports = router;