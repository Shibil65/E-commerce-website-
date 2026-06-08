const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      otp,
      isVerified: false,
    });

    console.log("User saved successfully");

    // Send OTP email
    try {
      await sendEmail({
        email,
        subject: "Verify Your Account",
        message: `
          <h2>Welcome to Kidoza</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire shortly.</p>
        `,
      });

      console.log("OTP email sent");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. Check your email for OTP.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;