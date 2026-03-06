const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kailanmo20",
  database: "arviointi"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});


// CREATE opiskelija
app.post("/opiskelija", (req, res) => {

  const {Etunimi, Sukunimi, Osoite, Luokkatunnus} = req.body;

  const sql = "INSERT INTO opiskelija (Etunimi, Sukunimi, Osoite, Luokkatunnus) VALUES (?,?,?,?)";

  db.query(sql, [Etunimi, Sukunimi, Osoite, Luokkatunnus], (err, result) => {
    if(err) throw err;
    res.send(result);
  });

});


// READ kaikki opiskelijat
app.get("/opiskelija", (req, res) => {

  db.query("SELECT * FROM opiskelija", (err, result) => {
    if(err) throw err;
    res.send(result);
  });

});


// UPDATE opiskelija
app.put("/opiskelija/:id", (req, res) => {

  const {Etunimi, Sukunimi, Osoite, Luokkatunnus} = req.body;

  const sql = "UPDATE opiskelija SET Etunimi=?, Sukunimi=?, Osoite=?, Luokkatunnus=? WHERE idOpiskelija=?";

  db.query(sql, [Etunimi, Sukunimi, Osoite, Luokkatunnus, req.params.id], (err, result) => {
    if(err) throw err;
    res.send(result);
  });

});


// DELETE opiskelija
app.delete("/opiskelija/:id", (req, res) => {

  const sql = "DELETE FROM opiskelija WHERE idOpiskelija=?";

  db.query(sql, [req.params.id], (err, result) => {
    if(err) throw err;
    res.send(result);
  });

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});