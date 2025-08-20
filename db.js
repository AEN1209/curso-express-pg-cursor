const { Pool } = require('pg');

const pool = new Pool({
  user: 'northwind',
  host: 'localhost',
  database: 'northwind',
  password: 'northwind',
  port: 5432,
});

module.exports = { pool };

