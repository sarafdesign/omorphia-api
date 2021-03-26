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

Images.getAll = (result) => {
  sql.query(
    `SELECT * FROM images JOIN gallery ON gallery.id_gallery = images.id_gallery`,
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
        console.log(res.file);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Images.getByImagesId = (imagesId, result) => {
  sql.query(
    `SELECT * FROM images where id_images = "${imagesId}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ditemukan: ", res);
        result(null, res);
        console.log(res.file);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

Images.deleteByGallery = function (imagesId, result) {
  sql.query(
    "DELETE FROM images WHERE id_images = ?",
    [imagesId],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else result(null, res);
    }
  );
};

Images.deleteFile = (imagesNama, result) => {
  const path = "./app/uploads/";
  const fs = require("fs");

  fs.unlink(path + imagesNama + ".jpg", (err) => {
    if (err) {
      fs.unlink(path + imagesNama + ".jpeg", (err) => {
        if (err) {
          fs.unlink(path + imagesNama + ".png", (err) => {
            if (err) {
              console.log("failed to delete local image:" + err);
            }
          });
        }
      });
    } else {
      console.log("successfully deleted local image");
    }
  });
};

Images.updateByGallery = function (imagesId, images, result) {
  sql.query(
    "UPDATE images SET id_gallery=?, images_nama=?, file=? WHERE id_images=?",
    [images.id_gallery, images.images_nama, images.file, imagesId],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Images;
