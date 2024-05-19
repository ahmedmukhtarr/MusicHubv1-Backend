const express = require('express');
const router = express.Router();
const merchandiseController = require('../controllers/merchandiseController');
const path = require('path');
const fs = require('fs');

const multer = require('multer');

// Define the path to the uploads directory
const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'merchandises');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
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

// Endpoint to create a new merchandise
router.post('/create', upload.single('image'), (req, res) => {
  // Call createMerchandise function and pass uploadDir as a parameter
  console.log("ndndndndn", uploadDir);
  merchandiseController.createMerchandise(req, res);
});

// Endpoint to get all merchandise
router.get('/getAll', merchandiseController.getAllMerchandise);

// Endpoint to get merchandise by ID
router.get('/:merchandiseId', merchandiseController.getMerchandiseById);

// Endpoint to update merchandise by ID
router.put('/:merchandiseId/update', upload.single('image'), merchandiseController.updateMerchandise);

// Endpoint to delete merchandise by ID
router.delete('/:merchandiseId/delete', merchandiseController.deleteMerchandise);

module.exports = router;