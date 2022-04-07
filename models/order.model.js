class Order {
  // Status => pending, fulfilled, cancelled
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-IE", {
        weekday: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    this.id = orderId;
  }
}

module.exports = Order;
