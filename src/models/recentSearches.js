// recentSearches.js
const mongoose = require('mongoose');

const recentSearchSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

const RecentSearch = mongoose.model('RecentSearches', recentSearchSchema);

module.exports = RecentSearch;