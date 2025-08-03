const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { items, orderType, phoneNumber, tableNumber, paymentStatus } =
    req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items provided in the order." });
  }
  // extract the menu item IDs and quantities from the request body
  const ids = items.map((item) => item.menuItemId);
  const menuItems = await MenuItem.find({ _id: { $in: ids } }); //
  // Create a map of menu items for easy lookup
  const menuItemMap = {};
  menuItems.forEach((item) => {
    menuItemMap[item._id] = item;
  });

  let totalPrice = 0;
  let orderItems = [];

  items.forEach((item) => {
    const menuItem = menuItemMap[item.menuItemId];
    if (!menuItem) {
      return next(
        new AppError(`Menu item with ID ${item.menuItemId} not found`, 404)
      );
    }

    totalPrice += menuItem.price * item.quantity;

    orderItems.push({
      menuItem: menuItem._id,
      quantity: item.quantity,
      phoneNumber: phoneNumber, // Assuming phone number is passed in the request body
      tableNumber: tableNumber, // Assuming table number is passed in the request body
      name: menuItem.name,
      paymentStatus: paymentStatus, // Assuming payment status is passed in the request body
    });
  });
  const newOrder = await Order.create({
    items: orderItems,
    orderType,
    totalPrice,
    phoneNumber,
    tableNumber,
    // add more fields like userId, status, timestamp if needed
  });

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: {
      order: newOrder, // This should be replaced with actual data from the database
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All orders retrieved successfully",
    data: {
      orders: [], // This should be replaced with actual data from the database
    },
  });
});

// Update order status
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  let status = req.body.status;

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  order.status = status;
  order.updatedAt = Date.now();
  await order.save();
  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    data: {
      order, // This should be replaced with actual data from the database
    },
  });
});
