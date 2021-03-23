// const sql = require("./db");

// const User = function (user) {
//   this.nama_user = user.nama_user;
//   this.password = user.password;
// };

// User.create = (newUser, result) => {
//   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
//     if (err) {
//       console.log("error:", err);
//       result(err, null);
//       return;
//     }
//     console.log("User yang masuk:", {
//       id_user: res.insertId,
//       ...newUser,
//     });
//     result(null, { id_user: res.insertId, ...newUser });
//   });
// };

// User.getAll = (result) => {
//   sql.query("SELECT * FROM user", (err, res) => {
//     if (err) {
//       console.log("error:", err);
//       result(err, null);
//       return;
//     }
//     console.log("User yang terambil:", res);
//     result(null, res);
//   });
// };

// module.exports = User;

const sql = require("./db");

const User = function (user) {
  this.nama_user = user.nama_user;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("user yang telah didaftarkan:", {
      id: res.insertId,
      ...newUser,
    });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getByUser = (userNama, result) => {
  sql.query(
    `SELECT * FROM USER WHERE nama_user = "${userNama}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Ditemukan: ", res);
        result(null, res);
        return;
      }

      result({ kind: "no_data" }, null);
    }
  );
};

module.exports = User;
