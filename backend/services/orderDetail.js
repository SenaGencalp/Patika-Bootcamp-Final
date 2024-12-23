const Order = require("../models/order");

const getOrderDetailById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
      throw new Error("Order not found");
    }
    console.log(
      "getOrderDetailById-------------------------------------------",
      order
    );
    return {
      ...order._doc,
      items: order.items.map((item) => ({
        ...item._doc,
        product: item.productId,
        productId: undefined,
      })),
    };
  } catch (error) {
    throw new Error("Error fetching order: " + error.message);
  }
};

const getOrders = async () => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId");
    console.log("Fetched orders: ", orders);
    return orders;
  } catch (err) {
    console.error("Error while fetching orders: ", err.message);
    throw new Error("Could not fetch orders.");
  }
};

module.exports = {
  getOrderDetailById,
  getOrders,
};
