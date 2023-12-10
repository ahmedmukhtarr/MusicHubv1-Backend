// controllers/postController.js
const Post = require('../models/postFeedSchema');
const User = require('../models/user');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { text, imageUrl, videoUrl } = req.body;
    const userId = req.user.userId; // Assuming you store the user ID in the request after authentication

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new Post({
      user: userId,
      text,
      imageUrl,
      videoUrl,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name'); // Populate the user field with the name property

    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific post
const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate('user', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a post
const updatePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { text, imageUrl, videoUrl } = req.body;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Update the post fields
      post.text = text;
      post.imageUrl = imageUrl;
      post.videoUrl = videoUrl;
  
      await post.save();
  
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error updating post', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a post
  const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await post.remove();
  
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting post', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Add a comment to a post
  const addComment = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { text } = req.body;
      const userId = req.user.userId; 
      const userName = req.user.name; 
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Create a new comment
      const newComment = {
        user: userId,
        name: userName,
        text,
      };
  
      post.comments.push(newComment);
  
      await post.save();
  
      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Error adding comment', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Like a post
const likePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.userId; // Assuming you store the user ID in the request after authentication
  
      const post = await Post.findById(postId).populate('likes', 'name'); // Populate the likes array with usernames
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has already liked the post
      if (post.likes.map(like => like.id).includes(userId)) {
        return res.status(400).json({ message: 'Post already liked by the user' });
      }
  
      // Add the user ID to the likes array
      post.likes.push(userId);
  
      await post.save();
  
      // Populate the likes array again to include usernames in the response
      await post.populate('likes', 'name').execPopulate();
  
      return res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
    } catch (error) {
      console.error('Error liking post', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };  

  // Unlike a post
const unlikePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.userId; // Assuming you store the user ID in the request after authentication
  
      const post = await Post.findById(postId).populate('likes', 'name'); // Populate the likes array with usernames
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has liked the post
      if (!post.likes.map(like => like.id).includes(userId)) {
        return res.status(400).json({ message: 'Post not liked by the user' });
      }
  
      // Remove the user ID from the likes array
      post.likes = post.likes.filter(like => like.id !== userId);
  
      await post.save();
  
      // Populate the likes array again to include usernames in the response
      await post.populate('likes', 'name').execPopulate();
  
      return res.status(200).json({ message: 'Post unliked successfully', likes: post.likes });
    } catch (error) {
      console.error('Error unliking post', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost, addComment, likePost, unlikePost };