require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max: 20, // maximum number of clients connected to the pool
  idleTimeoutMillis: 30000 // how long a client may be connected to the pool before being closed
});

pool.on("connect", () => {
  console.log("Connection successfully to the Database");
});

module.exports = { pool };
