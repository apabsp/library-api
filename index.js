require("dotenv").config();
const moviesRoutes = require("./routes/books");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/books", moviesRoutes); // constructing routes

app.listen(8080, (err) => {
  if (err){
    console.log("Houve um problema de conexão interno");
  }
  else{
    console.log("Servidor rodando na porta 8080");
  }
});