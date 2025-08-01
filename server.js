const connectDB = require('./config/db'); // Import the database connection
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 5000;
const app=require('./app'); // Import the app from app.js
connectDB(); // Connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
