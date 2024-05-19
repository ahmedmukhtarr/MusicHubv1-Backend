const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { createMusic, getAllMusic, updateMusic, deleteMusic } = require('../controllers/musicController');
const Music = require('../models/Music'); // Assuming Music model is defined in this file
const User = require('../models/user'); // Assuming User model is defined in this file

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDirectory = path.join(__dirname, '..', '..', 'public', 'uploads', 'music');
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory, { recursive: true });
    }
    cb(null, uploadsDirectory);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s/g, '_')}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Define routes
router.post('/upload', upload.single('file'), createMusic);
router.get('/getAll', getAllMusic);
router.put('/update/:id', updateMusic);
router.delete('/delete/:id', deleteMusic);

module.exports = router;