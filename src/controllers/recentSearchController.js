const RecentSearch = require('../models/recentSearches');

exports.saveRecentSearch = async (req, res) => {
  try {
    const { file, genre, language, title, user } = req.body;

    const newRecentSearch = new RecentSearch({
      file,
      genre,
      language,
      title,
      user,
    });

    await newRecentSearch.save();

    res.status(201).json({ message: 'Recent search added successfully', success: true });
  } catch (error) {
    console.error('Error adding recent search:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

exports.getAllRecentSearches = async (req, res) => {
  try {
    const recentSearches = await RecentSearch.find().sort({ createdAt: -1 }); // Sort by creation date, latest first
    res.status(200).json(recentSearches);
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
