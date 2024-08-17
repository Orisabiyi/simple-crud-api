const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyUser,
  loginUser,
} = require("../controller/user.controller.js");

router.post("/create", createUser);
router.get("/verify-otp", verifyUser);
router.get("/login", loginUser);

module.exports = router;
