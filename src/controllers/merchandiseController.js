const Merchandise = require('../models/merchandise');
const path = require('path')
const fs = require('fs')

// Create a new merchandise
const createMerchandise = async (req, res) => {

  try {
    // Extract data from the request body
    const { title, description, price, remainingItems } = req.body;

    // Ensure that the image is properly received from FormData
    const image = req.file; // Access the uploaded file object

    if (!image) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Construct the file path where the image will be saved
    const imagePath = `/uploads/merchandises/${image.filename}`;

    console.log(imagePath, "File saved successfully");

    // Create a new merchandise document with the file path
    const newMerchandise = new Merchandise({
      title,
      description,
      price,
      image: imagePath, // Store the file path in the image field
      remainingItems,
    });

    // Save the new merchandise to the database
    await newMerchandise.save();

    return res.status(201).json({ message: 'Merchandise created successfully' });
  } catch (error) {
    console.error('Error creating merchandise', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


  

// Get all merchandise
const getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find();
    console.log(merchandise);
    return res.json(merchandise);
  } catch (error) {
    console.error('Error fetching merchandise', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get merchandise by ID
const getMerchandiseById = async (req, res) => {
  try {
    const { merchandiseId } = req.params;

    const merchandise = await Merchandise.findById(merchandiseId);

    if (!merchandise) {
      return res.status(404).json({ message: 'Merchandise not found' });
    }

    return res.json(merchandise);
  } catch (error) {
    console.error('Error fetching merchandise by ID', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update merchandise by ID
const updateMerchandise = async (req, res) => {
    try {
      const { merchandiseId } = req.params;
      const { title, description, price, remainingItems } = req.body;
  
      // Check if an image file is provided
      let image;
      if (req.file) {
        image = req.file.buffer; // Use the buffer for image data
      }
  
      const updateFields = {
        title,
        description,
        price,
        remainingItems,
      };
  
      // If an image is provided, add it to the updateFields
      if (image) {
        updateFields.image = image;
      }
  
      const merchandise = await Merchandise.findByIdAndUpdate(
        merchandiseId,
        updateFields,
        { new: true }
      );
  
      if (!merchandise) {
        return res.status(404).json({ message: 'Merchandise not found' });
      }
  
      return res.json({ message: 'Merchandise updated successfully' });
    } catch (error) {
      console.error('Error updating merchandise', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

// Delete merchandise by ID
const deleteMerchandise = async (req, res) => {
  try {
    const { merchandiseId } = req.params;

    const result = await Merchandise.findByIdAndRemove(merchandiseId);

    if (!result) {
      return res.status(404).json({ message: 'Merchandise not found' });
    }

    return res.json({ message: 'Merchandise deleted successfully' });
  } catch (error) {
    console.error('Error deleting merchandise', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createMerchandise,
  getAllMerchandise,
  getMerchandiseById,
  updateMerchandise,
  deleteMerchandise,
};