// controllers/postController.js
const Post = require('../models/postFeedSchema');
const User = require('../models/user');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { text, imageUrl, videoUrl, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const newPost = new Post({
      user: userId,
      text,
      imageUrl,
      videoUrl,
    });

    await newPost.save();

    return res.status(201).json({ message: 'Post created successfully', success: true, data: newPost });
  } catch (error) {
    console.error('Error creating post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name'); // Populate the user field with the name property

    return res.status(200).json({ message: 'Posts retrieved successfully', success: true, data: posts });
  } catch (error) {
    console.error('Error getting posts', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get a specific post
const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId).populate('user', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    return res.status(200).json({ message: 'Post retrieved successfully', success: true, data: post });
  } catch (error) {
    console.error('Error getting post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text, imageUrl, videoUrl } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    // Update the post fields
    post.text = text;
    post.imageUrl = imageUrl;
    post.videoUrl = videoUrl;

    await post.save();

    return res.status(200).json({ message: 'Post updated successfully', success: true, data: post });
  } catch (error) {
    console.error('Error updating post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    await post.deleteOne();                              

    return res.status(200).json({ message: 'Post deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
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
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    // Create a new comment
    const newComment = {
      user: userId,
      name: userName,
      text,
    };

    post.comments.push(newComment);

    await post.save();

    return res.status(201).json({ message: 'Comment added successfully', success: true, data: newComment });
  } catch (error) {
    console.error('Error adding comment', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const post = await Post.findById(postId).populate('likes', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    // Check if the user has already liked the post
    if (post.likes.map(like => like.id).includes(userId)) {
      return res.status(400).json({ message: 'Post already liked by the user', success: false });
    }

    // Add the user ID to the likes array
    post.likes.push(userId);

    await post.save();

    // Use populate on the query object
    const updatedPost = await Post.findById(postId).populate('likes', 'name');

    return res.status(200).json({ message: 'Post liked successfully', success: true, data: { likes: updatedPost.likes } });
  } catch (error) {
    console.error('Error liking post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};


// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const post = await Post.findById(postId).populate('likes', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    // Check if the user has already liked the post
    const likeIndex = post.likes.findIndex(like => like.id === userId);

    if (likeIndex === -1) {
      return res.status(400).json({ message: 'User has not liked the post', success: false });
    }

    // Remove the user ID from the likes array
    post.likes.splice(likeIndex, 1);

    await post.save();

    // Populate the likes array again to include usernames in the response
    await post.populate('likes', 'name').execPopulate();

    return res.status(200).json({ message: 'Post unliked successfully', success: true, data: { likes: post.likes } });
  } catch (error) {
    console.error('Error unliking post', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost, addComment, likePost, unlikePost };