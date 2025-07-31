const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 5000;
const app=require('./app'); // Import the app from app.js

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
