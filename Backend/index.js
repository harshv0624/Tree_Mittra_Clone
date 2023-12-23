// Import necessary modules and packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config()

// Create an instance of Express
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Import the defined routes from the 'Routes' file
const rout = require('./Routes');

// Parse incoming JSON requests
app.use(bodyParser.json());

// Use the imported routes in the Express app
app.use(rout);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server Running");
});

// Connect to the MongoDB database using the provided URL
mongoose.connect(process.env.MONGO_URL).then((res) => {
  console.log("Connected To DB");
});
