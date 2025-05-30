require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL!');
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  if (!username || !email || !password || !confirm_password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }
  const sql = 'INSERT INTO bot_user (username, email, password, confirm_password) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, confirm_password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Username or email already exists.' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, userId: result.insertId });
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 