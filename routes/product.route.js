const express = require("express");
const router = express.Router();

// get route for api endpoints
router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);
