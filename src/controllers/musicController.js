const Music = require('../models/Music');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const createMusic = async (req, res) => {
  try {
    const { title, userId, language, genre } = req.body;
    console.log(req.file);
    const fileUrl = `/uploads/music/${req.file.filename}`;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const newMusic = new Music({
      title,
      fileUrl,
      language,
      genre,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    await newMusic.save();

    return res.status(201).json({
      message: 'Music created successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error creating music', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get all music files
const getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.find().populate('user', 'username');

    const formattedMusicList = musicList.map(music => ({
      id: music._id,
      title: music.title,
      file: music.fileUrl,
      language: music.language,
      genre: music.genre,
      user: music?.user ? music.user : 'Unknown',
    }));

    return res.status(200).json({
      message: 'Music retrieved successfully',
      success: true,
      data: formattedMusicList
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a music file
const updateMusic = async (req, res) => {
  try {
    const { title, userId, language, genre } = req.body;
    const musicId = req.params.id;

    const music = await Music.findById(musicId);

    if (!music || music.user.toString() !== userId) {
      return res.status(404).json({ message: 'Music not found or unauthorized', success: false });
    }

    const updatedMusic = await Music.findByIdAndUpdate(
      musicId,
      { title, language, genre },
      { new: true }
    );

    res.json(updatedMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a music file
const deleteMusic = async (req, res) => {
  try {
    const { userId } = req.body;
    const musicId = req.params.id;

    // Check if the music belongs to the specified user
    const music = await Music.findById(musicId);

    if (!music || music.user.toString() !== userId) {
      return res.status(404).json({ message: 'Music not found or unauthorized', success: false });
    }

    // Delete the music
    await Music.findByIdAndDelete(musicId);

    res.json({ message: 'Music file deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createMusic, getAllMusic, updateMusic, deleteMusic };


