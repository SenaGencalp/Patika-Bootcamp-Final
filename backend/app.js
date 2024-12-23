const express = require("express");
const routes = require("./routes/index");

const config = require("./config/db");
const cors = require("cors");

const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5017", "http://host.docker.internal:5017"],
  })
);

app.use(express.json());
//url için
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Database connect process
config.connectDB();

app.use("/api", routes);
app.listen(3000, () => {
  console.log("ayaktayiz");
});
