const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", ordersController.addOrder); //submit order

router.get("/", ordersController.getOrders); //get orders

module.exports = router;
