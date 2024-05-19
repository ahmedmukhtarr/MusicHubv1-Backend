const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Resolved'], // Add more statuses if needed
    default: 'Open',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;