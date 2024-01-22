const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createMusic, getAllMusic, updateMusic, deleteMusic } = require('../controllers/musicController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), createMusic);
router.get('/getAll', getAllMusic);
router.put('/update/:id', updateMusic);
router.delete('/delete/:id', deleteMusic);

module.exports = router;