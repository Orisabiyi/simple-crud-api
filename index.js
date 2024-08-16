const express = require("express");
const mongoose = require("mongoose");
const authenticateToken = require("./middleware/auth.middleware.js");
const ProductRoute = require("./routes/product.route.js");
const UserRoutes = require("./routes/user.route.js");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());

// public route
app.use("/user", UserRoutes);

// Protected route
app.use("/api/products", authenticateToken, ProductRoute);

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

// database connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server is running at port 3000"));
  })
  .catch(() => console.log("Error connecting to database"));
