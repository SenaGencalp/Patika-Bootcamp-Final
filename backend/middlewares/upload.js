const multer = require("multer");
const path = require("path");

// Set up storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Add a timestamp to avoid name collisions
    cb(null, fileName);
  }
});

// Create the multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Only allow image files
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error("Only image files are allowed!"));
    }
  }
});

module.exports = upload;
