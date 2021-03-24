const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./app");
  },
  filename: function (req, file, cb) {
    cb(null, `/uploads/${req.body.images_nama + path.extname(file.originalname)}`);
  },
});

const uploadImg = multer({ storage: storage }).single("file");

module.exports = { uploadImg };
