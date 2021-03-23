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

exports.delete = function (req, res) {
  Category.delete(req.params.categoryId, function (err, data) {
    if (err) res.send(err);
    res.json({ message: "Bisa dong" });
  });
};

exports.update = function (req, res) {
  const category = new Category({
    category_nama: req.body.category_nama
  });
  
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Category.update(
      req.params.categoryId,
      category,
      function (err, category) {
        if (err) res.send(err);
        res.json({ error: false, message: "Category successfully updated"});
      }
    );
  }
};