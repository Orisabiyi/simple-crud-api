const express = require("express");
const mongoose = require("mongoose");
const authenticateToken = require("./middleware/auth.middleware.js");
const ProductRoute = require("./routes/product.route.js");
const UserRout = require("");

const app = express();

// middleware
app.use(express.json());

app.use("/user", UserRoute);

app.use("/api/products", authenticateToken, ProductRoute);

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server is running at port 3000"));
  })
  .catch(() => console.log("Error connecting to database"));
