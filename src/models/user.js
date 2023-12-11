const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: false,
  },
  // phoneNumber: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (value) {
  //       // Define your phone number validation logic here.
  //       // Example: Check if the phone number is a valid format.
  //       // You can use regular expressions or a validation library like "validator".
  //       return /^[\d]{11}$/.test(value); // Example: Validates if the phone number has 10 digits.
  //     },
  //     message: 'Invalid phone number format', // Custom error message if validation fails.
  //   },
  // },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
