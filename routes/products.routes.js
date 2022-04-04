const express = require("express");
const productController = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", productController.getAllProducts);

module.exports = router;
