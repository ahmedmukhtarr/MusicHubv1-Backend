const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  remainingItems: { type: Number, required: true },
});

const Merchandise = mongoose.model('Merchandise', merchandiseSchema);

module.exports = Merchandise;