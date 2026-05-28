const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const carRoutes = require('./routes/cars');
app.use('/api/cars', carRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



