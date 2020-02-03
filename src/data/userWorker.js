const { pool } = require("../db/config");
const bcrypt = require("bcryptjs");

const userWorker = {
  create: async function(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 8);

      let result = await pool.query(
        `
            INSERT INTO users  (email, password, creationdate, alterdate) 
                        VALUES ($1, $2, NOW(), NOW()) RETURNING *
        `,
        [data.email, hashedPassword]
      );

      return result.rows[0];
    } catch (e) {
      throw e;
    }
  },
  get: async function(data) {
    try {
      let result = await pool.query(
        `
            SELECT 
                userid,
                email,
                password,
                creationdate,
                alterdate
            FROM Users 
            WHERE Users.userid = $1 OR Users.email = $2
        `,
        [+data.userid || null, data.email]
      );
      return result.rows[0];
    } catch (e) {
      throw e;
    }
  }
};

module.exports = userWorker;
