const express = require("express");
const { createAOrder, getOrdersByEmail, getAllOrders } = require("./order.controller");
const router = express.Router();

router.post("/", createAOrder);
router.get("/", getAllOrders); // fetch all orders
router.get("/email/:email", getOrdersByEmail);

module.exports = router;
