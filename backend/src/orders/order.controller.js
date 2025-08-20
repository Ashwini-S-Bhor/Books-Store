// src/orders/order.controller.js
const Order = require('./order.model');

const createAOrder = async (req, res) => {
  try {
    console.log("Incoming order data:", req.body);
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// ✅ Add this function to fetch orders by email
const getOrdersByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ email }).populate("productIds"); // if you want full book details
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

module.exports = {
  createAOrder,
  getOrdersByEmail, // ✅ export it
};
