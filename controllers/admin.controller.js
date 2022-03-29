function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

function createNewProduct() {}

module.exports = {
  getNewProduct: getNewProduct,
  getProducts: getProducts,
  createNewProduct: createNewProduct,
};
