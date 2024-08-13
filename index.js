const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

app.post("/api/products", function (req, res) {
  try {
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
  }
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
