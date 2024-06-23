const express = require('express');
const router = express.Router();
const recentSearchController = require('../controllers/recentSearchController');

router.post('/recent-searches', recentSearchController.saveRecentSearch);
router.get('/recent-searches', recentSearchController.getAllRecentSearches); 

module.exports = router;
