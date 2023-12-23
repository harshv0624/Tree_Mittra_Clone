// Import necessary modules and packages
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("./Schema/User");
const jwt = require("jsonwebtoken");
const IMG = require('./Schema/Image');

// Function to send email using nodemailer
async function sendEmail(email, code) {
  // Create a nodemailer transport object
  const tranport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.userId,
      pass: process.env.password,
    },
  });

  // Send email with verification code
  const info = await tranport.sendMail({
    from: process.env.email,
    to: `${email}`,
    subject: "Verify your account",
    text: `Verification Code : ${code}`,
  });
}

// Route to send verification email
router.post("/send", async (req, res) => {
  // Extract email from the request body
  let { num } = req.body;

  // Check if the user with the given email already exists
  User.findOne({ email: num }).then(async (savedUser) => {
    if (savedUser) {
      // User already exists, send an error response
      res.send({ error: "User Already Exists" });
      return;
    } else {
      // Generate a random verification code
      let otp = Math.floor(10000 + Math.random() * 90000);

      try {
        // Send the verification email
        await sendEmail(num, otp);
        res.send({ message: "Mail Sent To User", data: otp });
      } catch (err) {
        console.log("Failed to send email");
        res.send("Failed to send email");
      }
    }
  });
});

// Route to save user data after verification
router.post("/save", async (req, res) => {
  // Extract email from the request body
  const { email } = req.body;

  // Create a new User instance with verified status
  const data = {
    email: email,
    verified: true,
  };
  const user = new User(data);

  try {
    // Save the user data to the database
    await user.save();

    // Create a JWT token for the user
    const token = jwt.sign({ _id: user._id }, "secretKey");
    res.send({ message: "User Registered", token });
  } catch (err) {
    res.send({ error: "Failed" });
  }
});

// Route to get a random image
router.get('/GetImg', async (req, res) => {
  // Get the current day of the week
  const currentDate = new Date();
  let currentDay = currentDate.getDay();

  // Count the total number of images in the database
  const totalImages = await IMG.countDocuments();

  // Generate a random index to select a random image
  const random = Math.floor(Math.random() * totalImages)

  // Retrieve a random image from the database
  const image = await IMG.findOne().skip(random)
  
  // Send the image data in the response
  res.json({ data: image.data, id: image._id })
})

// Route to get a specific image by ID
router.get('/GetNewImg', async (req, res) => {
  // Extract image ID from the query parameters
  const id = req.query.id

  // Retrieve the image by ID from the database
  const image = await IMG.findById(id)

  // Send the image data in the response
  res.json({ data: image.data, id: image._id })
})

// Export the router for use in other files
module.exports = router;
