const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings
} = require('../controllers/bookingController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');

// User routes
router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);

// Admin route
router.get('/', protect, isAdmin, getAllBookings);

module.exports = router;
