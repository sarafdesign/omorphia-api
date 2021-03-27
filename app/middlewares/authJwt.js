const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  // let token = req.headers['x-access-token'];
  // let token = req.header('x-access-token')
  let token = req.cookies.token;
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    // return res.status(401).end();
    return res.status(401).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    return res.status(200).send({
      message: "Success",
    });
    // req.id_user = decoded.id;
    // next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
