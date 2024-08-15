const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");

const app = express();
app.use(express.json());

// Middleware to test if the id provided by the client is valid
function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

app.get("/", function (req, res) {
  res.send("Hello from Node Server");
});

app.get("/api/products", async function (req, res) {
  try {
    const product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// This path is use for updating a product in the database
app.put("/api/products/:id", async function (req, res) {
  try {
    const { id } = req.params;

    // Validating Id
    if (!validateObjectId(id))
      return res.send(400).json({ message: "Product Id is not valid" });

    const findProduct = await Product.findById(id);

    // validating product existence
    if (!findProduct)
      return res.status(404).json({ message: "Product does not exist" });

    const updateProduct = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).send(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async function (req, res) {
  try {
  } catch (error) {}
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
