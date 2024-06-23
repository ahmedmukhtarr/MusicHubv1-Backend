const mongoose = require('mongoose');

const paymentDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who added the items to the cart
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  cartItems: [{
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    remainingItems: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  }],
  status: {
    type: String,
    enum: ['Pending', 'In Process', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
}, { timestamps: true });

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);

module.exports = PaymentDetail;