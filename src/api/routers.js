const express = require("express");
const router = express.Router();
const auth = require("./routes/auth");

//Authenticaton
router.use(auth);

module.exports = router;
