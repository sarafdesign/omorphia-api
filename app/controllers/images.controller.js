const Images = require("../models/images.model");
const path = require("path");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }

  const images = new Images({
    id_gallery: req.body.id_gallery,
    images_nama: req.body.images_nama,
    file: req.file,
  });

  Images.create(images, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan images",
      });
    else res.send(data);
  });
};

exports.getByGallery = (req, res) => {
  Images.getByGallery(req.params.galleryNama, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.galleryNama}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with id " + req.params.galleryNama,
        });
      }
    } else res.send(data);
  });
};
