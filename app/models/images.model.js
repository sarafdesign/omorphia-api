const sql = require("./db");

const Images = function (images) {
  this.id_gallery = images.id_gallery;
  this.images_nama = images.images_nama;
  this.file = images.file;
};

Images.create = (newImages, result) => {
  sql.query("INSERT INTO images SET ?", newImages, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("images yang masuk:", {
      id_images: res.insertId,
      ...newImages,
    });
    result(null, { id_images: res.insertId, ...newImages });
  });
};

Images.getByGallery = (galleryNama, result) => {
  sql.query(
    `SELECT * FROM images JOIN gallery ON gallery.id_gallery = images.id_gallery where gallery.id_gallery = "${galleryNama}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

module.exports = Images;
