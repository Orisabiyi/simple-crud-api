const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { generateOTP, sendOTP } = require("../utils/otp.util.js");

const createUser = async function (req, res) {
  try {
    let { username, email, password } = req.body;
    username = username.toLowerCase();
    email = email.toLowerCase();

    // Check for existing user
    if (await User.findOne({ username }))
      return res.status(409).json({ message: "User already exists" });

    if (await User.findOne({ email }))
      return res.status(409).json({ message: "User already exists" });

    // hash password and otp generatation
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    // send otp code to user
    sendOTP(user.email, otp);
    res.status(201).send({ message: "token is sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = async function (req, res) {
  try {
    const { otp } = req.body;
    const user = await User.findOne({ otp });

    if (!user || user.otp !== otp || Date.now() > user.otpExpires)
      return res
        .status(409)
        .json({ message: "Your OTP IS invalid or expired" });

    // Generate a jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.otp = null;
    user.otpExpires = null;

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // Check if user exist or password is valid
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  verifyUser,
  loginUser,
};
