const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// Load environment variables
dotenv.config();

const app = require('./app');


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});