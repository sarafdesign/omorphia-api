const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./app/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({ storage: storage }).single("file");

module.exports = { uploadImg };
