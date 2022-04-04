const express = require("express");

const router = express.Router();

//Redirect to /products which takes to all-products ejs page
router.get("/", function (req, res) {
  res.redirect("/products");
});

router.get("/unauthorized", function (req, res) {
  res.status(401).render("shared/unauthorized");
});

router.get("/accessdenied", function (req, res) {
  res.status(403).render("shared/accessdenied");
});

module.exports = router;
