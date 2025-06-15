const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/carController');

const { protect } = require('../middlewares/authMiddleware'); // for user access

// Public access
router.get('/', getAllCars);
router.get('/:id', getCarById);

// Authenticated users can add/update/delete cars
router.post('/', protect, createCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

module.exports = router;
