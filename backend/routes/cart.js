const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const cartController = require("../controllers/cart");

router.post("/add", authMiddleware, cartController.addToCart);
router.delete("/remove", authMiddleware, cartController.removeFromCart);

router.get("/", authMiddleware, cartController.getCart);

module.exports = router;
