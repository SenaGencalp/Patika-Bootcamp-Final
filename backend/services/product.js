const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category"); // Category modelini import et
const fs = require("fs");
const path = require("path");

const productService = {
  createProduct: async (productData, file) => {
    const { productName, description, category, type, price, stock } =
      productData;

    try {
      // Gelen category ismini al ve karşılık gelen ID'yi bul
      const categoryDoc = await Category.findOne({ categoryName: category });
      if (!categoryDoc) {
        throw new Error(`Category '${category}' not found.`);
      }

      const categoryId = categoryDoc._id; // Bulunan kategorinin ID'sini al

      const imagePath = file
        ? `/uploads/${file.filename}`
        : "/uploads/default.jpg";
      console.log("Saving product with image path:", imagePath);

      const newProduct = new Product({
        image: imagePath,
        productName,
        description,
        category: categoryId, // Kategori ID'sini kaydediyoruz
        price,
        stock,
        type,
      });

      await newProduct.save();
      return newProduct;
    } catch (e) {
      console.error("Error saving product:", e.message);
      throw new Error("Product creation failed: " + e.message);
    }
  },

  updateProduct: async (productData, file,id) => {
    const { productName, description, type, price, stock, category } =
      productData;
    console.log(" m mkmöl", id);

    const imagePath = file
      ? `/uploads/${file.filename}`
      : "/uploads/default.jpg";
    console.log("Saving product with image path:", imagePath);
    return await Product.findByIdAndUpdate(
      id,
      {
        productName,
        description,
        type,
        price,
        stock,
        category,
        image: imagePath,
      },
      { new: true }
    );
  },

  deleteProduct: async (params) => {
    const { id } = params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }

      if (product.image) {
        const imagePath = path.join(__dirname, "..", product.image);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      const productDelete = await Product.findByIdAndDelete(id);
      return productDelete;
    } catch (e) {
      console.error("Error deleting product:", e.message);
      throw new Error("Error deleting product: " + e.message);
    }
  },

  getProduct: async (params) => {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product ID.");
    }

    return await Product.findById(id).populate("category", "categoryName");
  },

  getProducts: async () => {
    return await Product.find().populate("category", "categoryName");
  },
};

module.exports = productService;
