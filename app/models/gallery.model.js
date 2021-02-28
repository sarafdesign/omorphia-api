const Category = require("./category.model");
const sql = require("./db");

const Gallery = function (gallery) {
  this.nama = gallery.nama;
  this.deskripsi = gallery.deskripsi;
  this.id_category = gallery.id_category;
};

Gallery.create = (newGallery, result) => {
  sql.query("INSERT INTO gallery SET ?", newGallery, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("category yang masuk:", {
      id_gallery: res.insertId,
      ...newGallery,
    });
    result(null, { id_category: res.insertId, ...newGallery });
  });
};

Gallery.getAll = (result) => {
  sql.query("SELECT * FROM gallery", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("galeri yang terambil:", res);
    result(null, res);
  });
};

Gallery.getByCategory = (categoryNama, result) => {
  sql.query(
    `SELECT * FROM gallery JOIN category ON gallery.id_category = category.id_category JOIN images ON gallery.id_gallery = images.id_gallery where category.category_nama = "${categoryNama}"`,
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
module.exports = Gallery;
