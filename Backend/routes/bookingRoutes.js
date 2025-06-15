const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);

module.exports = router;
