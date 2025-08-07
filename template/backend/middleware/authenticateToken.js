const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Try to get token from cookie first, then fallback to Authorization header
  const token =
    req.cookies?.token || // ✅ From cookie
    (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]); // or from header

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    console.log('✅ Decoded JWT:', decoded);
    req.user = decoded; // { id, role }
    next();
  });
};

module.exports = authenticateToken;
