const jwt = require("jsonwebtoken");
const userWorker = require("../../data/userWorker");
const generateAuthToken = require("../utils/generateAuthToken");

//Validates authentication using JWT Token
const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Access denied" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).send({ message: "Access denied" });
  }
};

module.exports = auth;
