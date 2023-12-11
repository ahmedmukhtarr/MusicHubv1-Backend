const express = require('express');
const { registerUser, signIn } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signIn);

module.exports = router;
