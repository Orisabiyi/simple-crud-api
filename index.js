const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const app = express();

// middleware

app.use(express.json());

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

app.use("/api/products", ProductRoute);

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

mongoose
  .connect(
    "mongodb+srv://orisabiyidavid:W1hKbcu0o44UOuag@simple-crud-api.bnjnd.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=simple-crud-api"
  )
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server is running at port 3000"));
  })
  .catch(() => console.log("Error connecting to database"));
