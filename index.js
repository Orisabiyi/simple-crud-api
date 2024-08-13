const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(3000, () => console.log("Server is running at port 3000"));

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

mongoose
  .connect(
    "mongodb+srv://orisabiyidavid:W1hKbcu0o44UOuag@simple-crud-api.bnjnd.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=simple-crud-api"
  )
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Error connecting to database"));
