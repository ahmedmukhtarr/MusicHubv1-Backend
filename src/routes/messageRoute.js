const express = require('express');
const { sendMessageUsingFile, sendMessageAll } = require('../controllers/messageController');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/file', upload.single('file'), sendMessageUsingFile);
router.post('/nofile', sendMessageAll);

module.exports = router;
