module.exports = (app) => {
  const contact = require("../controllers/contact.controller");
  const category = require("../controllers/category.controller");
  const gallery = require("../controllers/gallery.controller");

  app.post("/contact", contact.create);
  app.get("/contact", contact.getAll);
  app.post("/category", category.create);
  app.get("/category", category.getAll);
  app.post("/gallery", gallery.create);
  app.get("/gallery", gallery.getAll);
  app.get("/gallery/category/:categoryNama", gallery.getByCategory);
};
