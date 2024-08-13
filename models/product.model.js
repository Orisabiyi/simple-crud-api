const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});
