const Complaint = require('../models/complaint');

const submitComplaint = async (req, res) => {
  try {
    const { complaint, userId } = req.body;

    if (!complaint) {
      return res.status(400).json({ error: 'Complaint is required' });
    }

    // Create a new complaint with user reference
    const newComplaint = new Complaint({
      complaint,
      user: userId,
    });

    await newComplaint.save();

    return res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error('Error submitting complaint', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getComplaints = async (req, res) => {
  try {
    // Fetch all complaints from the database and populate user information
    const complaints = await Complaint.find().populate('user', 'name email id');

    return res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update the status of the complaint to 'Resolved'
    complaint.status = req.body.status;

    await complaint.save();

    return res.status(200).json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    console.error('Error resolving complaint', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;

    // Find the complaint by ID and remove it
    const result = await Complaint.findByIdAndRemove(complaintId);

    if (!result) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    return res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { submitComplaint, getComplaints, resolveComplaint, deleteComplaint };