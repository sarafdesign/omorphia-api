const sql = require("./db");

const Category = function (category) {
  this.category_nama = category.category_nama;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("category yang masuk:", {
      id_category: res.insertId,
      ...newCategory,
    });
    result(null, { id_category: res.insertId, ...newCategory });
  });
};

Category.getAll = (result) => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("category yang terambil:", res);
    result(null, res);
  });
};

Category.delete = function (categoryId, result) {
  sql.query(
    "DELETE FROM category WHERE id_category = ?",
    [categoryId],
    function (err, res) {
      if (err) {
        console.log ("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Category.getByCategoryID = (categoryId, result) => {
  sql.query(
    `SELECT * FROM category WHERE id_category = "${categoryId}"`,
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

Category.update = function (categoryId, category, result) {
  sql.query(
    "UPDATE category SET category_nama=? WHERE id_category=?",
    [category.category_nama, categoryId],
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

module.exports = Category;
