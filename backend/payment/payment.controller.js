const { client } = require("./paypalClient");
const paypal = require("@paypal/checkout-server-sdk");

// ✅ COD Payment (just mark as pending, no online transaction)
const cashOnDelivery = async (req, res) => {
  try {
    // Usually you just create an order in DB with status "Pending" or "COD"
    const { orderDetails } = req.body;

    // Example response (save in DB in real project)
    res.json({
      success: true,
      message: "Order placed with Cash on Delivery",
      paymentMethod: "COD",
      order: orderDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "COD order failed", error });
  }
};

// ✅ Create PayPal Order
const createPayPalOrder = async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD", // can change to your currency
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await client().execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating PayPal order", error });
  }
};

// ✅ Capture PayPal Payment
const capturePayPalOrder = async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    res.json({ success: true, capture: capture.result });
  } catch (error) {
    res.status(500).json({ message: "Error capturing PayPal order", error });
  }
};

module.exports = { cashOnDelivery, createPayPalOrder, capturePayPalOrder };
