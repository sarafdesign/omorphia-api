const sql = require("./db");

const Contact = function (contact) {
  this.email = contact.email;
  this.name = contact.name;
  this.message = contact.message;
};

Contact.create = (newContact, result) => {
  sql.query("INSERT INTO contact SET ?", newContact, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("contact yang masuk:", { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  });
};

Contact.getAll = (result) => {
  sql.query("SELECT * FROM contact", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("contact yang terambil:", res);
    result(null, res);
  });
};

Contact.delete = function (contactId, result) {
  sql.query(
    "DELETE FROM contact WHERE id = ?",
    [contactId],
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

Contact.update = function (contactId, contact, result) {
  sql.query(
    "UPDATE contact SET email=?, name=?, message=? WHERE id=?",
    [contact.email, contact.name, contact.message, contactId],
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

module.exports = Contact;
