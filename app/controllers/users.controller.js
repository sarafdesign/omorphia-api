// const User = require("../models/users.model");

// exports.create = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "isi tidak bisa kosong",
//     });
//   }

//   const user = new User({
//     nama_user: req.body.nama_user,
//     password: req.body.password
//   });

//   User.create(user, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Ada error ketika memasukkan user",
//       });
//     else res.send(data);
//   });
// };

// exports.getAll = (req, res) => {
//   User.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Ada error ketika memanggil user",
//       });
//     else res.send(data);
//   });
// };

const sql = require("../models/db");
const User = require("../models/users.model");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "isinya jangan dikosongi ya sayang",
    });
  }

  const user = new User({
    nama_user: req.body.nama_user,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ada error yang beb",
      });
    else res.send(data);
  });
};

exports.getByUser = (req, res) => {
  User.getByUser(req.params.userNama, (err, data) => {
    if (err) {
      if (err.kind === "no_data") {
        res.status(404).send({
          message: `Tidak ditemukan ${req.params.userNama}`,
        });
      } else {
        res.status(500).send({
          message: `Error ${req.params.userNama}`,
        });
      }
    } else res.send(data);
  });
};

exports.signin = function (req, res) {
  var nama_user = req.body.nama_user;
  sql.query(
    "SELECT * FROM user WHERE nama_user = ?",
    [nama_user],
    function (error, results, fields) {
      if (error) {
        res.json({
          status: false,
          message: "there are some error with query",
        });
      } else {
        if (results.length > 0) {
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            results[0].password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          } else {
            var token = jwt.sign({ nama_user: results[0].nama_user }, config.secret, {
              expiresIn: 3600, // 1 hour
            });

            res.status(200).send({
              nama_user: results[0].nama_user,
              accessToken: token,
            });
          }
          // if (password == results[0].password) {
          //   res.json({
          //     status: true,
          //     message: "successfully authenticated",
          //   });
          // } else {
          //   res.json({
          //     status: false,
          //     message: "Nama and password does not match",
          //   });
          // }
        } else {
          res.json({
            status: false,
            message: "User does not exits",
          });
        }
      }
    }
  );
};

// exports.signout = function (req, res) {
//   const token = jwt.destroy(token);

//   res.status(200).send({
//     accessToken: token,
//   });
// }


