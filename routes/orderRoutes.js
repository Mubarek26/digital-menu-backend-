const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Define routes for orders
router
  .route("/")
  .post(orderController.createOrder) // Create a new order
  .get(orderController.getAllOrders); // Get all orders

router
    .route("/update/:id")
    .patch(orderController.updateOrderStatus); // Update an order by ID

module.exports = router; // Export the router for use in app.js
