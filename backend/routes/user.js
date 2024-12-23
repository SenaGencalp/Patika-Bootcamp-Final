const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, userController.getAllUsers); // Tüm kullanıcıları getir
router.get("/getuser", authMiddleware, userController.getAllUsers); // Tüm kullanıcıları getir
router.get("/account", authMiddleware, userController.getAccount); // Belirli bir kullanıcıyı getir
router.put("/:id", authMiddleware, userController.updateUser); // Kullanıcı güncelle
router.delete("/:id", authMiddleware, userController.deleteUser); // Kullanıcı sil
module.exports = router;
