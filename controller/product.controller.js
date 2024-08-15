const mongoose = require("mongoose");
const Product = require("../models/product.model.js");

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
