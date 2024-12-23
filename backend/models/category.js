const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    enum: ["Necklace", "Bracelet", "Ring", "Earring"],  // Kategorileri burada tanımlıyoruz
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
