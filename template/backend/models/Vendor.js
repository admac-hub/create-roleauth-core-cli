// models/Vendor.js
const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  category: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('Vendor', VendorSchema);
