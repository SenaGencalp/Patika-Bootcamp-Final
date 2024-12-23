const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Gold", "Silver", "Steel"], // Ürünün malzemesini tanımlayan enum
    required: true,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Category modeline referans
    ref: "Category", // Category modelini burada referans alıyoruz
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
