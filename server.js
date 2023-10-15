const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'rahasia'; // Kunci rahasia untuk JWT

app.use(bodyParser.json());


const users = [];

// Middleware 
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Akses ditolak' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
    req.user = user;
    next();
  });
}

// Rute untuk registrasi pengguna
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Simpan pengguna ke dalam basis data (biasanya menggunakan database)
  users.push({ username, password });
  res.json({ message: 'Pengguna berhasil terdaftar' });
});

// Rute untuk login pengguna
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Validasi pengguna (biasanya dari database)
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Login gagal' });

  // Buat token JWT untuk pengguna
  const token = jwt.sign({ username }, secretKey);
  res.json({ token });
});

// Rute untuk mendapatkan data pengguna (memerlukan otentikasi)
app.get('/user', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Rute CRUD contoh
app.get('/items', (req, res) => {
  // Mendapatkan daftar item (biasanya dari database)
  res.json({ items: [] });
});

app.post('/items', (req, res) => {
  // Menambahkan item (biasanya ke database)
  res.json({ message: 'Item berhasil ditambahkan' });
});

app.put('/items/:id', (req, res) => {
  // Memperbarui item (biasanya di database)
  res.json({ message: 'Item berhasil diperbarui' });
});

app.delete('/items/:id', (req, res) => {
  // Menghapus item (biasanya dari database)
  res.json({ message: 'Item berhasil dihapus' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
