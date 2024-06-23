const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
  },
  language: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
