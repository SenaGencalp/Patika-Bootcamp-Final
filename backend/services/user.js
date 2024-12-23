const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser = async (userParams) => {
  const { username, email, password, role } = userParams;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    newUser.save();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Tüm kullanıcıları listeleme servisi
exports.getAllUsers = async () => {
  return await User.find();
};

// Belirli bir kullanıcıyı getirme servisi
exports.getUserById = async (id) => {
  return await User.findById(id);
};

// Kullanıcıyı güncelleme servisi
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password"
  );
};

// Kullanıcıyı silme servisi
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
