const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { upload } = require('../config/cloudinary');

// GET - all listings 
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    let filter = {};

    if (city) filter.city = { $regex: city, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.log('GET Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET - single listing
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.log('GET Single Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST - add new listing
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);
    const { make, model, year, price, city, description } = req.body;
    const image = req.file.path;
    const car = new Car({ make, model, year, price, city, description, image });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.log('POST Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Mark as Sold
router.patch('/:id/sold', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { isSold: true },
      { new: true }
    );
    res.json(car);
  } catch (err) {
    console.log('PATCH Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE -  delete listing
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.log('DELETE Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;