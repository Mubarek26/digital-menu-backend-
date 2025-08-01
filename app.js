const express = require('express');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/globalErrorHandler');
const dotenv = require('dotenv');
const menuRoutes = require('./routes/menuRoutes'); // Import menu routes
dotenv.config(); // Load environment variables
const app = express();
app.use(express.json());

//routes to handle menu items
app.use('/api/v1/menu', menuRoutes); // Import and use menu routes

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error); // Pass the error to the next middleware
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;