const express = require("express");
const app = express();
const path = require("path")
const env = require("dotenv").config();
const connectDB = require('./config/db'); // Import the connectDB function

// Check if dotenv loaded correctly
if (env.error) {
    console.error("Error loading .env file:", env.error);
    process.exit(1); // Exit the process if .env file is not loaded
}

// Log MongoDB URI for debugging
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Connect to the database
connectDB();


// Start the server
const _PORT = process.env.PORT || 3000;
app.listen(_PORT, () => {
    console.log(`SERVER Running Successfully On PORT: ${_PORT}`);
});

// Export the app for testing or other modules
module.exports = app;