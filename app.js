const express = require("express");
const app = express();
const path = require("path")
const env = require("dotenv").config();
const connectDB = require('./config/db'); // Import the connectDB function
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
const userRouter = require("./routes/userRouter")


// Check if dotenv loaded correctly
if (env.error) {
    console.error("Error loading .env file:", env.error);
    process.exit(1); // Exit the process if .env file is not loaded
}

// Log MongoDB URI for debugging
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Connect to the database
connectDB();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
// app.set("views", path.join(__dirname, 'views/user'), path.join(__dirname) )
app.set("views", [path.join(__dirname, 'views/user'), path.join(__dirname, 'views')]);

app.use(express.static(path.join(__dirname, 'public')))
app.use("/",userRouter)


// Start the server
const _PORT = process.env.PORT || 3000;
app.listen(_PORT, () => {
    console.log(`SERVER Running Successfully On PORT: ${_PORT}`);
});

// Export the app for testing or other modules
module.exports = app;