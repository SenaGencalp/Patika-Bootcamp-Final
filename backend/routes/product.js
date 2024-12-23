const express = require("express");
const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.jpg`);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), productController.createProduct);

router.put(
  "/update/:id",
  upload.single("image"),
  productController.updateProduct
);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/:id", productController.getProduct);

router.get("/", productController.getProducts);

module.exports = router;
