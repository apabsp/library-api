const {Router} = require("express");
const router = Router(); // Use interno

const pool = require("../connectdb");

router.post("/", async (req, res) =>{
  const {name, genre, author, year} = req.body; // title and other info will come from this request

  const result = await pool.query(
    "INSERT INTO books (name, genre, author, year) VALUES ($1, $2, $3, $4)RETURNING *", [name, genre, author, year] // * returns the complete row that was inserted
  );

  res.status(201).json({result: result.rows[0]});
})

router.get("/", async (req, res) =>{

  const result = await pool.query("SELECT * FROM books",[]);

  //res.status(200).json({result: result});
  res.status(200).json({result: result.rows});
})

router.get("/byAuthor", async(req,res) => {
  const result = await pool.query("SELECT * FROM books WHERE author = ($1)",[req.body.author]);

  res.status(200).json({result: result.rows});
})



module.exports = router;