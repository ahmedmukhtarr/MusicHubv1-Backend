const express = require('express');
const { submitComplaint, getComplaints, deleteComplaint, resolveComplaint } = require('../controllers/complaintController');

const router = express.Router();

// Endpoint to submit a new complaint
router.post('/submit-complaint', submitComplaint);

// Endpoint to get all complaints
router.get('/get-complaints', getComplaints);
router.delete('/delete/:complaintId', deleteComplaint);
router.put('/resolve/:complaintId', resolveComplaint);

module.exports = router;
