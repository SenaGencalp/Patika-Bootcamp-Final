const express = require("express");

const userRouter = require("./user");
const authRouter = require("./auth");
const productRouter = require("./product");
const categoryRouter = require("./category");
const contactRouter = require("./contact");
const cartRouter = require("./cart");
const orderRoutes = require("./order");

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/contact", contactRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRoutes);
router.use("/order-detail", orderRoutes);
router.use("/admin/orders", orderRoutes);
module.exports = router;
