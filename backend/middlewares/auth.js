// middlewares/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Token sağlanmadı." });
  }

  const token = authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token sağlanmadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Email yerine ID ile kullanıcıyı buluyoruz
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Geçersiz token: kullanıcı bulunamadı." });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: "Geçersiz token." });
  }
};

module.exports = authMiddleware;
