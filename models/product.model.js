const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findByID(productID) {
    let prodID;
    try {
      prodID = await new mongodb.ObjectId(productID);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = db.getDb().collection("products").findOne({ _id: prodID });

    if (!product) {
      const error = new Error("Could not find product with provided ID");
      error.code = 404;
      throw error;
    }

    return product;
  }

  static async findAll() {
    // Return an array of products at the end
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (product) {
      return new Product(product);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
