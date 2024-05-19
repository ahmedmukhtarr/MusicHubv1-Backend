// models/post.js
const mongoose = require('mongoose');

const postFeedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      user: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // This should be the name of your user model
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
      text: {
        type: String,
        required: true,
      },
    }
  ],
});

const Post = mongoose.model('Post', postFeedSchema);

module.exports = Post;