const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - only allow authenticated users
const protect = async (req, res, next) => {
  let token;

  // Check if token is sent in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info (excluding password) to request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

// Admin-only middleware (optional)
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied – Admins only' });
  }
  next();
};

module.exports = {
  protect,
  isAdmin,
};
