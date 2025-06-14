const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  type: String,
  pricePerDay: Number,
  image: String,
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
