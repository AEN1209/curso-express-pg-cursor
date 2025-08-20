const express = require('express');
const { pool } = require('./db');

const app = express();
app.use(express.json());

// Get all users
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single user
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING * ',
      [username, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const { rows } = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE user_id = $3 RETURNING * ',
      [username, email, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server; // Export server for testing

