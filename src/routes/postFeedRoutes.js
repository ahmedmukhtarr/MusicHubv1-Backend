const express = require('express');
const passport = require('passport');
const router = express.Router();
const { createPost, getAllPosts, getPost, updatePost, deletePost, addComment, likePost, unlikePost } = require('../controllers/postFeedController');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Define the path to the uploads directory
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'moderation');

if (!fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Directory ${uploadDir} created successfully`);
    } catch (error) {
        console.error(`Error creating directory ${uploadDir}:`, error);
    }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static(uploadDir));

// Endpoint to create a new post
router.post('/create', upload.single('image'), (req, res) => {
  console.log("UploadDir:", uploadDir);
  createPost(req, res);
});
// Middleware to check if the user is authenticated
const authenticateUser = passport.authenticate('jwt', { session: false });

router.get('/getAll', getAllPosts);
router.get('/get/:postId', getPost);
router.put('/update/:postId', updatePost);
router.delete('/delete/:postId', deletePost);
router.post('/add/comment/:postId', addComment);
router.post('/like/:postId', likePost);
router.post('/unlike/:postId', unlikePost);

module.exports = router;