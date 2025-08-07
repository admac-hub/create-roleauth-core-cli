const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authenticateToken = require('../middleware/authenticateToken');

// Vendor onboarding route (protected)
router.post('/onboarding', authenticateToken, vendorController.vendorOnboarding);

module.exports = router;
