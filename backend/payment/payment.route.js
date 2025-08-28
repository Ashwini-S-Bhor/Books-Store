const express = require("express");
const { cashOnDelivery, createPayPalOrder, capturePayPalOrder } = require("../controllers/paymentController");

const router = express.Router();

// COD
router.post("/cod", cashOnDelivery);

// PayPal
router.post("/create-paypal-order", createPayPalOrder);
router.post("/capture-paypal-order", capturePayPalOrder);

module.exports = router;
