const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const signIn = async (req, res) => {

  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create and sign a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    return res.status(200).json({ token, ...user });
  } catch (error) {
    console.error('Error signing in user', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log('Reset Password Request Body:', req.body);
    const { email, newPassword, confirmPassword } = req.body;
    console.log('Reset Password for email:', email);

    // Check if newPassword is provided
    if (!newPassword || typeof newPassword !== 'string') {
      return res.status(400).json({ message: 'Invalid new password' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the new password and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the new password and update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    
    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you send the user ID in the request
    const { newUsername, newPassword, confirmPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the username if provided
    if (newUsername) {
      user.name = newUsername;
    }

    // Update the password if provided
    if (newPassword) {
      // Check if the new password and confirmPassword match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      // Hash the new password and update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Save the updated user object
    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const profileDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you send the user ID in the URL parameters

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting profile details', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, signIn, resetPassword, updateProfile, profileDetails };



