const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postFeedRoutes = require('./routes/postFeedRoutes');
const musicRoutes = require('./routes/musicRoutes');

const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postFeedRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;
