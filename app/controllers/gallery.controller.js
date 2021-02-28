const { getByCategory } = require("../models/gallery.model");
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
          message: `Not found Customer with id ${req.params.categoryNama}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with id " + req.params.categoryNama,
        });
      }
    } else res.send(data);
  });
};
