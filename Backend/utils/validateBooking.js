// Booking validation logic
const validateBooking = (data) => {
  const errors = {};

  if (!data.carId) {
    errors.carId = 'Car ID is required';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required';
  }

  if (new Date(data.startDate) > new Date(data.endDate)) {
    errors.dateRange = 'End date must be after start date';
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

module.exports = validateBooking;
