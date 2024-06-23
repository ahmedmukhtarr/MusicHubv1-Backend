const PaymentDetail = require('../models/paymentDetails');

// Create a new payment detail
const createPaymentDetail = async (req, res) => {
    try {
      const { userId, name, phoneNumber, address, paymentMethod, cartItems } = req.body;
  
      const newPaymentDetail = new PaymentDetail({
        user: userId,
        name,
        phoneNumber,
        address,
        paymentMethod,
        cartItems,
      });
  
      await newPaymentDetail.save();
  
      return res.status(201).json({ message: 'Payment detail created successfully' });
    } catch (error) {
      console.error('Error creating payment detail', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

// Get all payment details
const getAllPaymentDetails = async (req, res) => {
    try {
      const { userId } = req.query;
  
      let paymentDetails;
      if (userId) {
        paymentDetails = await PaymentDetail.find({ user: userId });
      } else {
        paymentDetails = await PaymentDetail.find();
      }
  
      return res.json(paymentDetails);
    } catch (error) {
      console.error('Error fetching payment details', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };  

// Get payment detail by ID
const getPaymentDetailById = async (req, res) => {
  try {
    const { paymentDetailId } = req.params;

    const paymentDetail = await PaymentDetail.findById(paymentDetailId);

    if (!paymentDetail) {
      return res.status(404).json({ message: 'Payment detail not found' });
    }

    return res.json(paymentDetail);
  } catch (error) {
    console.error('Error fetching payment detail by ID', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update payment detail by ID
const updatePaymentDetail = async (req, res) => {
    try {
      const { paymentDetailId } = req.params;
      const { name, phoneNumber, address, paymentMethod, status } = req.body;
  
      const updateFields = { name, phoneNumber, address, paymentMethod, status };
  
      const paymentDetail = await PaymentDetail.findByIdAndUpdate(
        paymentDetailId,
        updateFields,
        { new: true }
      );
  
      if (!paymentDetail) {
        return res.status(404).json({ message: 'Payment detail not found' });
      }
  
      return res.json({ message: 'Payment detail updated successfully', paymentDetail });
    } catch (error) {
        console.error('Error updating payment detail', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

// Delete payment detail by ID
const deletePaymentDetail = async (req, res) => {
  try {
    const { paymentDetailId } = req.params;

    const result = await PaymentDetail.findByIdAndRemove(paymentDetailId);

    if (!result) {
      return res.status(404).json({ message: 'Payment detail not found' });
    }

    return res.json({ message: 'Payment detail deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment detail', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPaymentDetail,
  getAllPaymentDetails,
  getPaymentDetailById,
  updatePaymentDetail,
  deletePaymentDetail,
};
