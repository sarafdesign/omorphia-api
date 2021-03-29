module.exports = (app) => {
  const contact = require("../controllers/contact.controller");
  const category = require("../controllers/category.controller");
  const gallery = require("../controllers/gallery.controller");
  const images = require("../controllers/images.controller");
  const user = require("../controllers/users.controller");
  const uploadImg = require("../config/upload.config,");
  const authJwt = require("../middlewares/authJwt")

  //CRUD Contact
  app.post("/contact", contact.create);
  app.get("/contact", contact.getAll);
  app.delete("/contact/:contactId", contact.delete);
  app.put("/contact/:contactId", contact.update);

  //CRUD Category
  app.post("/category", category.create);
  app.get("/category", category.getAll);
  app.delete("/category/:categoryId", category.delete);
  app.put("/category/:categoryId", category.update);
  app.get("/category/:categoryId", category.getByCategoryId);

  //CRUD Gallery
  app.post("/gallery", gallery.create);
  app.get("/gallery", gallery.getAll);
  app.get("/gallery/category/:categoryNama", gallery.getByCategory);
  app.delete("/gallery/:galleryId", gallery.delete);
  app.put("/gallery/:galleryId", gallery.update);
  app.get("/gallery/:galleryId", gallery.getByGalleryId);

  //CRUD Images
  app.post("/images", uploadImg.uploadImg, images.create);
  app.get("/images/gallery/", images.getAll);
  app.get("/images/gallery/:galleryNama", images.getByGallery);
  app.delete("/images/gallery/:imagesNama/:imagesId", images.delete);
  app.put(
    "/images/gallery/:imagesNama/:imagesId",
    uploadImg.uploadImg,
    images.update
  );
  app.get("/images/:imagesId", images.getByImagesId);

  //CRUD User
  app.post("/register", user.create);
  app.get("/checkUser", authJwt.verifyToken, user.getAll);
  app.get("/user/:userNama", user.getByUser);
  app.post("/signin", user.signin);
  // app.get("/signout", user.signout);
};
