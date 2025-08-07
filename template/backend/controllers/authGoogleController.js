// controllers/authGoogleController.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// 🔁 Shared logic to generate JWT and cookie
const generateTokenAndRedirect = (req, res, targetUrl) => {
  const token = jwt.sign({ id: req.user._id, role: req.user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(targetUrl);
};

// ✅ User callback handler
exports.googleUserCallback = (req, res) => {
  generateTokenAndRedirect(req, res, 'http://localhost:3000/user/dashboard');
};

// ✅ Vendor callback handler
exports.googleVendorCallback = (req, res) => {
  const redirectUrl = req.user.isOnboarded
    ? 'http://localhost:3000/vendor/dashboard'
    : 'http://localhost:3000/vendor/onboarding';

  generateTokenAndRedirect(req, res, redirectUrl);
};
