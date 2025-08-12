// const { router } = require("../app");
const express = require("express");
const router = express.Router();
const uploadImage=require('../middlewares/uploadImage')
const menuController = require("../controllers/menuController"); // Import menu controller
const authController = require('../controllers/authController')

router.use(authController.protect); // Protect all routes after this middleware
router.use(authController.restrictTo("admin","manager"));
router
  .route("/")
  .get(menuController.getAllMenuItems) // Get all menu items
  .post(uploadImage, menuController.createMenuItem); // Create a new menu item

router
  .route("/:id")
  .get(menuController.getMenuItem) // Get a specific menu item by ID
  .patch(uploadImage,menuController.updateMenuItem) // Update a menu item by ID
  .delete(menuController.deleteMenuItem); // Delete a menu item by ID

module.exports = router; // Export the router for use in app.js
