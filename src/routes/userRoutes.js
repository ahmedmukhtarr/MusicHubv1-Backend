const express = require('express');
const { registerUser, signIn, resetPassword, updateProfile, profileDetails } = require('../controllers/userController');



const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signIn);
router.post('/reset-password', resetPassword);
router.put('/update-profile', updateProfile);
router.get('/profile-details/:userId', profileDetails);


module.exports = router;
