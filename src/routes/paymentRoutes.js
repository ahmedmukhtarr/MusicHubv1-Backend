const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment detail
router.post('/payment-details', paymentController.createPaymentDetail);

// Get all payment details
router.get('/payment-details', paymentController.getAllPaymentDetails);

// Get a payment detail by ID
router.get('/payment-details/:paymentDetailId', paymentController.getPaymentDetailById);

// Update a payment detail by ID
router.put('/payment-details/:paymentDetailId', paymentController.updatePaymentDetail);

// Delete a payment detail by ID
router.delete('/payment-details/:paymentDetailId', paymentController.deletePaymentDetail);

module.exports = router;
