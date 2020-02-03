const jwt = require("jsonwebtoken");

module.exports = generateAuthToken = async function(user) {
  return await jwt.sign(
    {
      userid: user.userid
    },
    process.env.JWTSECRET,
    { expiresIn: "1h" }
  );
};
