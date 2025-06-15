const Booking = require('../models/Booking');
const Car = require('../models/Car');

exports.createBooking = async (req, res) => {
  try {
    const { car, startDate, endDate } = req.body;

    const carData = await Car.findById(car);
    if (!carData) return res.status(404).json({ message: 'Car not found' });

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = carData.pricePerDay * days;

    const booking = await Booking.create({
      user: req.user.id,
      car,
      startDate,
      endDate,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('car');
  res.json(bookings);
};
