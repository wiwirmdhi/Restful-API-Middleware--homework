const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "movies-database",
  user: "wiwirahmadani",
  password: "belajar1234",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
