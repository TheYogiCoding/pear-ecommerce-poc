class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    //Loop check in case item added to cart is duplicated
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = +item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;

        //Increment the shopping cart - dont continue function
        return;
      }
    }
    //Add to cart if unique item added to cart
    this.totalQuantity++;
    this.totalPrice += product.price;
    this.items.push(cartItem);
  }
}

module.exports = Cart;
