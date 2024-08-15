const mongoose = require("mongoose");
const Product = require("../models/product.model.js");

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const getProducts = async function (req, res) {
  try {
    const product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async function (req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async function (req, res) {
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
    const newProduct = await Product.findById(id);
    res.status(200).send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async function (req, res) {
  try {
    const { id } = req.params;
    const product = Product.findByIdAndDelete(id, req.body);
    res.status(200).json({ message: "Product is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
