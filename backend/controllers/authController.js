const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// REGISTER
const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const otp = Math.floor(
      100000 +
      Math.random() * 900000
    ).toString();

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpire:
          Date.now() +
          10 * 60 * 1000,
        isVerified: false
      });

    const message = `
      <h2>Welcome to ShopNest</h2>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>
        OTP expires in
        10 minutes.
      </p>
    `;

    await sendEmail({
      email,
      subject:
        'ShopNest OTP Verification',
      message
    });

    res.status(201).json({
      message:
        'OTP sent successfully',
      email
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
  try {

    const {
      email,
      otp
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(404).json({
        message:
          'User not found'
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message:
          'Invalid OTP'
      });
    }

    if (
      user.otpExpire <
      Date.now()
    ) {
      return res.status(400).json({
        message:
          'OTP expired'
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      message:
        'Account verified successfully'
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(401).json({
        message:
          'Invalid email or password'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message:
          'Please verify OTP first'
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(401).json({
        message:
          'Invalid email or password'
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token:
        generateToken(
          user._id
        )
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

// GET USERS
const getUsers = async (req, res) => {
  try {

    const users =
      await User.find({})
        .select('-password');

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  verifyOtp
};