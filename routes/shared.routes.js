const express = require("express");

const router = express.Router();

//Redirect to /products which takes to all-products ejs page
router.get("/", function (req, res) {
  res.redirect("/products");
});

module.exports = router;
