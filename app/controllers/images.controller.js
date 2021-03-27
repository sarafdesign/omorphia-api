const Images = require("../models/images.model");
const path = require("path");
const sharp = require("sharp");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isi tidak bisa kosong",
    });
  }

  const images = new Images({
    id_gallery: req.body.id_gallery,
    images_nama: req.body.images_nama,
    file: req.file.filename,
  });

  Images.create(images, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memasukkan images",
      });
    // console.log(req.file);
    else
      sharp("./" + req.file.path)
        .toBuffer()
        .then((data) => {
          sharp(data)
            // .toFormat("png")
            // .resize(1080)
            .png({ progressive: true, compressionLevel: 5 })
            .jpeg({progressive: true, quality: 50})
            .toFile("./" + req.file.path, (err, info) => {
              console.log("oke");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    res.send(data);
  });
  //   res.send(data);
  // });
};

exports.getAll = (req, res) => {
  Images.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error ketika memanggil gallery",
      });
    else res.send(data);
  });
};

exports.getByGallery = (req, res) => {
  Images.getByGallery(req.params.galleryNama, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found Images with id ${req.params.galleryNama}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Images with id " + req.params.galleryNama,
        });
      }
    } else res.send(data);
  });
};

exports.getByImagesId = (req, res) => {
  Images.getByImagesId(req.params.imagesId, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Not found Images with id ${req.params.imagesId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Images with id " + req.params.imagesId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = function (req, res) {
  Images.deleteFile(req.params.imagesNama, function (err, data) {
    if (err) res.send(err);
    // res.json({ message: "Bisa dong" });
  });
  Images.deleteByGallery(req.params.imagesId, function (err, data) {
    if (err) res.send(err);
    res.json({ message: "Oke" });
  });
};

// exports.delete = function (req, res) {
//   Images.deleteByGallery(
//     req.params.galleryNama,
//     req.params.imagesId,
//     function (err, data) {
//       if (err) res.send(err);
//       Images.deleteFile(req.params.imagesId, function (err, data) {
//         if (err) res.send(err);
//         res.json({ message: "Oke" });
//       });
//       // res.json({ message: "Bisa dong" });
//     }
//   );
// };

exports.update = function (req, res) {
  const images = new Images({
    id_gallery: req.body.id_gallery,
    images_nama: req.body.images_nama,
    file: req.file.filename,
  });

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({
      error: true,
      message:
        "ANJENG KENAPA KESINI TERUS ||| Please provide all required field",
    });
  } else {
    Images.deleteFile(req.params.imagesNama, function (err, data) {
      if (err) res.send(err);
      // res.json({ message: "Bisa dong" });
    });
    Images.updateByGallery(req.params.imagesId, images, function (err, images) {
      if (err) res.send(err);
      res.json({ error: false, message: "Images successfully updated" });
    });
  }
};
