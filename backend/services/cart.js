const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  return cart;
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  return cart;
};

exports.removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId } } },
    { new: true }
  );
  return cart;
};
