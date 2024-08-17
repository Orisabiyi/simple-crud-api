const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { generateOTP, sendOTP } = require("../utils/otp.util.js");

const createUser = async function (req, res) {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase();

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ message: "Username already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      username,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendOTP("orisabiyidavid@gmail.com", otp);

    // Generate a jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).send({ token });
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
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
