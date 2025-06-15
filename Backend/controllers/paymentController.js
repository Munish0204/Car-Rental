const paypalClient = require('../utils/paypal');
const paypal = require('@paypal/checkout-server-sdk');

// Create PayPal Order
exports.createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toString()
      }
    }]
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
};

// Capture PayPal Order
exports.capturePayPalOrder = async (req, res) => {
  const { orderID } = req.params;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
};
