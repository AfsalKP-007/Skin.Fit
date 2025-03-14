const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

// Validate the MongoDB connection string
if (!mongoURI) {
    console.error("MongoDB connection string is missing!");
    process.exit(1); // Exit the process with failure
}

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI); // Removed deprecated options
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;