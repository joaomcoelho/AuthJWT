const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/user/register", user.userRegister);
router.post("/user/login", user.userLogin);
router.get("/user/profile", auth, user.userGet);

module.exports = router;
