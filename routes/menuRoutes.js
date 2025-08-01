// const { router } = require("../app");
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController"); // Import menu controller
router
  .route("/")
  .get(menuController.getAllMenuItems) // Get all menu items
  .post(menuController.createMenuItem); // Create a new menu item

router
  .route("/:id")
  .get(menuController.getMenuItem) // Get a specific menu item by ID
  .patch(menuController.updateMenuItem) // Update a menu item by ID
  .delete(menuController.deleteMenuItem); // Delete a menu item by ID

module.exports = router; // Export the router for use in app.js
