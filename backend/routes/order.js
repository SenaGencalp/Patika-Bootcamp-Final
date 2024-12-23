const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middlewares/auth");

router.post("/create", authMiddleware, orderController.createOrder);
router.get("/:id", orderController.getOrderDetailById);
router.get("/", orderController.getOrders);
module.exports = router;
