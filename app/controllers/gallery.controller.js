const Gallery = require("../models/gallery.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }

  const gallery = new Gallery({
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    id_category: req.body.id_category,
  });

  Gallery.create(gallery, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan gallery",
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Gallery.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memanggil gallery",
      });
    else res.send(data);
  });
};

exports.getByCategory = (req, res) => {
  Gallery.getByCategory(req.params.categoryNama, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryNama}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Category with id " + req.params.categoryNama,
        });
      }
    } else res.send(data);
  });
};

exports.delete = function (req, res) {
  Gallery.delete(req.params.galleryId, function (err, data) {
    if (err) res.send(err);
    res.json({ message: "Bisa dong" });
  });
};

exports.update = function (req, res) {
  const gallery = new Gallery({
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
  });

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Gallery.update(req.params.galleryId, gallery, function (err, gallery) {
      if (err) res.send(err);
      res.json({ error: false, message: "Gallery successfully updated" });
    });
  }
};
