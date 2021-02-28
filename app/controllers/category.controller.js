const Category = require("../models/category.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }

  const category = new Category({
    category_nama: req.body.category_nama,
  });

  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan category",
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memanggil category",
      });
    else res.send(data);
  });
};
