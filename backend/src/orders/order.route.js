const express = require('express');
const { createAOrder, getOrdersByEmail } = require('./order.controller');
const router = express.Router();

router.post("/", createAOrder);

// ✅ add this route to get orders by email
router.get("/email/:email", getOrdersByEmail);

module.exports = router;
