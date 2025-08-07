const mongoose = require('mongoose');
const Vendor = require('../models/Vendor');
const User = require('../models/User');

exports.vendorOnboarding = async (req, res) => {
  try {
    const { businessName, category, phone, address } = req.body;
    const userId = req.user.id;

    // Ensure userId is a proper ObjectId
    const objectId = userId; // use directly — it's already a valid ObjectId


    // Check if a vendor profile already exists
    const existingVendor = await Vendor.findOne({ userId: objectId });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already onboarded' });
    }

    // Create new vendor profile
    const vendor = new Vendor({
      userId: objectId,
      businessName,
      category,
      phone,
      address,
    });

    await vendor.save();

    // Update User model with onboarding status
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { isOnboarded: true },
      { new: true }
    );

    console.log('✅ User updated:', updatedUser);

    res.status(201).json({ message: 'Vendor onboarding complete' });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
