const Product = require("../models/product.model");

async function addCartItem(req, res) {
  let product;
  try {
    product = await Product.findByID(req.body.productID);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  //ajax request
  res.statu(201).json({
    message: "Cart updated",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
