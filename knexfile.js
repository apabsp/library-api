require("dotenv").config();

module.exports = {

 development: {

  client: "pg",

  connection: process.env.DATABASE_URL.replace(

   "postgresql://",

   "postgres://"

  ), // garante compatibilidade

  pool: { min: 0, max: 5 }, // evita estouro de conexões

  migrations: {

   directory: "./migrations",

  },

 },

};