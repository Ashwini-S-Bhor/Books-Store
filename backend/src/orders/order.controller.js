const Order = require('./order.model');

// Create a new order
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

// Get orders by email
const getOrdersByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await Order.find({ email }).populate("productIds");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// ✅ Get all orders (for admin dashboard)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productIds") // optional: populate books
      .populate("userId", "email name"); // optional: populate user info
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

module.exports = {
  createAOrder,
  getOrdersByEmail,
  getAllOrders, // ✅ added
};
