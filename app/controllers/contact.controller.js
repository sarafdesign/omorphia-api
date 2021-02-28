const Contact = require("../models/contact.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }

  const contact = new Contact({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
  });

  Contact.create(contact, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan contact",
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Contact.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memanggil contact",
      });
    else res.send(data);
  });
};
