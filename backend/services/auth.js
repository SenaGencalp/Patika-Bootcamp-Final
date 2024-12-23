const bcrypt = require("bcrypt");
const mongooseUser = require("../models/user");
const jwt = require("jsonwebtoken");

async function login(userParams) {
  const { email, password } = userParams;
  try {
    const user = await mongooseUser.findOne({ email: email });

    console.log(email, "Email kontrol ediliyor");
    console.log(user, "Bulunan kullanıcı");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("girdi");
      return { message: "invalid username or password" };
    }

    // JWT token'ı kullanıcı ID'si ile oluşturuyoruz
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Kullanıcı nesnesini gönderirken password'ı hariç tutuyoruz
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return { token, message: "success", user: userWithoutPassword };
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = { login };
