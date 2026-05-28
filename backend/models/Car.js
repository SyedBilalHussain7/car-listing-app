const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isSold: { type: Boolean, default: false },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;