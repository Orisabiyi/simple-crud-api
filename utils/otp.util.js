const nodemailer = require("nodemailer");
// require("dotenv").config();
process.loadEnvFile(".env");

const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

const sendOTP = async function (email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.COMPANY_EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateOTP,
  sendOTP,
};
