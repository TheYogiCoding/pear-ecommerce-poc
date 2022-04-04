const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findByID(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({ ...req.body, _id: req.params.id });

  if (req.file) {
    //the file could be parsed by multer
    product.replaceImage(req.file.filename);

    try {
      await product.save();
    } catch (error) {
      return next(error);
    }

    res.redirect("/admin/products");
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByID(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "Deleted product" });
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
