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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book deleted", deleted: result.rows[0] });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // expecting JSON body { "title": "New title" }

  const result = await pool.query(
    "UPDATE books SET name = $1 WHERE id = $2 RETURNING *",
    [title, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book updated", book: result.rows[0] });
});



module.exports = router;