const userWorker = require("../../data/userWorker");
const generateAuthToken = require("../utils/generateAuthToken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const moment = require("moment");

//Get Controller
exports.userGet = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const user = await userWorker.get({ userid });
    const creationDate = moment(user.creationdate).format("YYYY-MM-DD");

    return res.status(201).json({
      message: `Hello ${user.email}! We have been together since ${creationDate}.`
    });
  } catch (e) {
    next(e);
  }
};

//Register Controller
const registerValidate = async function({ email, password, confirmPassword }) {
  if (password != confirmPassword) return "Passwords don't match";

  if (!validator.isEmail(email)) return "Invalid email format";

  const userExists = await userWorker.get({ email });
  if (userExists) return "Email already registered";

  return "";
};

exports.userRegister = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const message = await registerValidate(req.body);
    if (message) return res.status(400).json({ message });

    const user = await userWorker.create({ email, password });
    const token = await generateAuthToken(user);
    res.header("Authorization", "Bearer " + token);

    return res.status(201).json({ message: `User created! Hello ${email}` });
  } catch (e) {
    next(e);
  }
};

//Login Controller
const loginValidate = async function(password, user) {
  if (!user) return false;
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return false;
  return true;
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await userWorker.get({ email });
    let isValid = await loginValidate(password, user);

    if (!isValid) return res.status(401).json({ message: "Unable to log in" });

    const token = await generateAuthToken(user);
    res.header("Authorization", "Bearer " + token);

    return res.status(201).json({
      message: `Hello ${user.email} you are logged in!`
    });
  } catch (e) {
    next(e);
  }
};
