// backend/controllers/order.js
const Order = require("../models/order");
const Product = require("../models/product");
const { sendOrderCreatedEvent } = require("../kafka/producers");
const orderDetailService = require("../services/orderDetail");

exports.createOrder = async (req, res) => {
  try {
    console.log(req);

    const userId = req.user.id;
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid totalAmount" });
    }

    // Ürün fiyatlarını doğrulamak ve price'ı item'e eklemek için her productId üzerinden geçiyoruz
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price, // price alanını burada ekliyoruz
      });
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: calculatedTotal,
      status: "CREATED",
    });
    await order.save();

    // Kafka'ya sipariş oluşturuldu mesajı
    await sendOrderCreatedEvent({
      orderId: order._id.toString(),
      userId: userId,
      totalAmount: calculatedTotal,
      items: orderItems.map((i) => ({
        productId: i.productId.toString(),
        quantity: i.quantity,
        price: i.price, // event'e price bilgisini de ekleyebilirsiniz
      })),
    });

    res.status(200).json({ message: "Order created", orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await orderDetailService.getOrderDetailById(id);
    return res.status(200).json({ orderDetail });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const response = await orderDetailService.getOrders();
    res.status(200).send({ success: true, response });
  } catch (e) {
    console.error("Error in fetching products:", e.message);
    res.status(500).send({ error: e.message });
  }
};
