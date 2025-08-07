const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const googleController = require('../controllers/authGoogleController');



//================ Manual Authentication Routes ================


// User registration
router.post('/register', authController.registerUser);

// Vendor registration
router.post('/vendor/register', authController.registerVendor);

// Unified login (user or vendor)
router.post('/login', authController.login);

// Email verification (GET link from email)
router.get('/verify-email', authController.verifyEmail); // ✅ ADD THIS LINE

// Test route
router.get('/test', (req, res) => {
  res.send('Auth routes are working!');
});


// Google OAuth Routes

// User Google Auth
router.get('/google/user', passport.authenticate('google-user', {
  scope: ['profile', 'email'],
}));

router.get(
  '/google/user/callback',
  passport.authenticate('google-user', { session: false, failureRedirect: '/login' }),
  googleController.googleUserCallback
);

// Vendor Google Auth
router.get('/google/vendor', passport.authenticate('google-vendor', {
  scope: ['profile', 'email'],
}));

router.get(
  '/google/vendor/callback',
  passport.authenticate('google-vendor', { session: false, failureRedirect: '/login' }),
  googleController.googleVendorCallback
);

module.exports = router;
