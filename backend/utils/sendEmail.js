const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // OTP as string (IMPORTANT)
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    console.log("User saved successfully");

    try {
      const info = await sendEmail({
        email,
        subject: "Verify Your Account",
        message: `
          <h2>Welcome to Kidoza</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
        `,
      });

      console.log("EMAIL INFO:", info);
      console.log("OTP email sent successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);

      // ❗ IMPORTANT: don't lie to frontend
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully",
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