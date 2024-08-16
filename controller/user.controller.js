const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  try {
    const user = await User.create();
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};

module.exports = {
  createUser,
};
