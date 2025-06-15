const express = require('express');
const router = express.Router();
const {
  createPayPalOrder,
  capturePayPalOrder
} = require('../controllers/paymentController');

router.post('/paypal/create-order', createPayPalOrder);
router.post('/paypal/capture/:orderID', capturePayPalOrder);

module.exports = router;
