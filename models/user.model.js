const { pool } = require('../db');

const UserModel = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  },

  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0];
  },

  create: async (username, email) => {
    const { rows } = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING * ',
      [username, email]
    );
    return rows[0];
  },

  update: async (id, username, email) => {
    const { rows } = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE user_id = $3 RETURNING * ',
      [username, email, id]
    );
    return rows[0];
  },

  delete: async (id) => {
    const { rowCount } = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    return rowCount;
  },
};

module.exports = UserModel;
