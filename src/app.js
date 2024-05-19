const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postFeedRoutes = require('./routes/postFeedRoutes');
const musicRoutes = require('./routes/musicRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const merchandiseRoutes = require('./routes/merchandiseRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postFeedRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/merchandise', merchandiseRoutes);

module.exports = app;
