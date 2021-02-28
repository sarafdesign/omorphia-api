const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di omorphia API." });
});
const port = 3000;
require("./app/routes/contact.routes")(app);
app.listen(port, () => console.log(`Server ini berjalan dalam port 3000`));
