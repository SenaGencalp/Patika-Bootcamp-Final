const productService = require("../services/product");

const productController = {
  createProduct: async (req, res) => {
    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    try {
      const response = await productService.createProduct(req.body, req.file);
      res.status(201).send({ success: true, response });
    } catch (e) {
      console.error("Error in product creation:", e.message);
      res.status(500).send({ error: e.message });
    }
  },

  updateProduct: async (req, res) => {
    console.log("control", req.body);
    console.log("Received file:", req.file);

    try {
      const response = await productService.updateProduct(
        req.body,
        req.file,
        req.params.id
      );
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.error("Error in updating product:", e.message);
      res.status(500).send({ error: e.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const response = await productService.deleteProduct(req.params);
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.error("Error in deleting product:", e.message);
      res.status(500).send({ error: e.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const response = await productService.getProducts();
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.error("Error in fetching products:", e.message);
      res.status(500).send({ error: e.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const response = await productService.getProduct(req.params);

      if (!response) {
        return res.status(404).send({ error: "Product not found" });
      }
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.error("Error in fetching product:", e.message);
      res.status(500).send({ error: e.message });
    }
  },
  
};

module.exports = productController;
