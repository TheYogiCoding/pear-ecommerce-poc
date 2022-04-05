const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    //new session - make a new cart
    cart = new Cart();
  } else {
    //Get Cart items from session
    cart = new Cart(req.session.cart.items);
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
