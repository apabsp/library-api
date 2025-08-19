let pg = require("pg");

const {Pool} = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
//Connections file
module.exports = pool;

