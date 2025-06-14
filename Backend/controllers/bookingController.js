const Booking = require('../models/Booking');
const Car = require('../models/Car');

exports.createBooking = async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  // Optional: Check for overlapping bookings

  const booking = await Booking.create({
    user: req.user.id,
    car: carId,
    startDate,
    endDate,
  });

  res.status(201).json(booking);
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('car');
  res.json(bookings);
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('car');
  res.json(bookings);
};
