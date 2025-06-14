const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} = require('../controllers/carController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getAllCars);
router.get('/:id', getCarById);

// Admin routes
router.post('/', protect, isAdmin, createCar);
router.put('/:id', protect, isAdmin, updateCar);
router.delete('/:id', protect, isAdmin, deleteCar);

module.exports = router;
