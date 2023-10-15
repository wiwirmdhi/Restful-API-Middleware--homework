const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db"); // Import koneksi database
const app = express();

app.use(bodyParser.json());

// Implementasikan rute RESTful API
// GET
app.get("/api/data", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  db.query("SELECT * FROM data", (err, result) => {
    if (err) {
      console.error("Kesalahan dalam mengambil data:", err);
      res.status(500).send("Kesalahan server");
    } else {
      res.json(result.rows);
    }
  });
});

// Route  POST
app.post("/api/data", (req, res) => {
  const { name, value } = req.body;
  db.query(
    "INSERT INTO data (name, value) VALUES ($1, $2)",
    [name, value],
    (err) => {
      if (err) {
        console.error("Kesalahan dalam menambahkan data:", err);
        res.status(500).send("Kesalahan server");
      } else {
        res.status(201).send("Data berhasil ditambahkan");
      }
    }
  );
});

// Route PUT
app.put("/api/data/:id", (req, res) => {
  const id = req.params.id;
  const { name, value } = req.body;
  db.query(
    "UPDATE data SET name = $1, value = $2 WHERE id = $3",
    [name, value, id],
    (err) => {
      if (err) {
        console.error("Kesalahan dalam memperbarui data:", err);
        res.status(500).send("Kesalahan server");
      } else {
        res.status(200).send("Data berhasil diperbarui");
      }
    }
  );
});

// Route  DELETE
app.delete("/api/data/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM data WHERE id = $1", [id], (err) => {
    if (err) {
      console.error("Kesalahan dalam menghapus data:", err);
      res.status(500).send("Kesalahan server");
    } else {
      res.status(200).send("Data berhasil dihapus");
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
