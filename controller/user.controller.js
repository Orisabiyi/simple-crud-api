const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
