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

module.exports = Category;
