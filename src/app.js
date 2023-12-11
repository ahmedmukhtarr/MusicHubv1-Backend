const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoute');

const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/sendMessage', messageRoutes);


module.exports = app;
