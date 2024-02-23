const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "biblioteca",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { titulo } = req.body;
  const { autor } = req.body;
  const { genero } = req.body;
  const { ISBN } = req.body;

  let mysql = "INSERT INTO livros ( titulo, autor, genero, ISBN) VALUES (?, ?, ?, ?)";
  db.query(mysql, [titulo, autor, genero, ISBN], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { titulo } = req.body;
  const { autor } = req.body;
  const { genero } = req.body;
  const { ISBN } = req.body;

  let mysql =
    "SELECT * from livros WHERE titulo = ? AND autor = ? AND genero = ? AND ISBN = ?";
  db.query(mysql, [titulo, autor, genero, ISBN], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM livros";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { titulo } = req.body;
  const { autor } = req.body;
  const { genero } = req.body;
  const { ISBN } = req.body;
  
  let mysql = "UPDATE livros SET titulo = ?, autor = ?, genero = ?, ISBN = ?, WHERE id = ?";
  db.query(mysql, [titulo, autor, genero, ISBN, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM livros WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});