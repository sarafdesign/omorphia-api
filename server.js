const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "*",
  allowedHeaders: "*",
  optionsSuccessStatus: 200,
  method: "GET ,HEAD ,PUT ,PATCH, POST, DELETE, OPTIONS",
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("./app/uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di omorphia API." });
});
const port = 3001;
require("./app/routes/all.routes")(app);

app.listen(port, () => console.log(`Server ini berjalan dalam port ` + [port]));
