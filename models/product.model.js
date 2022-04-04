const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.updateImageData();
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
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodID });

    if (!product) {
      const error = new Error("Could not find product with provided ID");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async findAll() {
    // Return an array of products at the end
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (product) {
      return new Product(product);
    });
  }

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    //Product exists - update - if not create new object
    if (this.id) {
      const prodID = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: prodID }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  async replaceImage(newImage) {
    //replace old image with new one
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productID = new mongodb.ObjectId(this.id);
    //this will remove the object from the database but retain the image
    return db.getDb().collection("products").deleteOne({ _id: productID });
  }
}

module.exports = Product;
