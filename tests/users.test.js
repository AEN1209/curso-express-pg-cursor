const request = require('supertest');
const server = require('../index'); // Import the server instance
const { pool } = require('../db');

describe('Users API', () => {
  beforeAll(async () => {
    // Clear and re-seed the database before running tests
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    await pool.query(
      `
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE
      );
      `
    );
    await pool.query(
      `INSERT INTO users (username, email) VALUES ('testuser1', 'test1@example.com'), ('testuser2', 'test2@example.com');`
    );
  });

  afterAll(async () => {
    await pool.end();
    await server.close(); // Close the Express.js server
  });

  it('should fetch all users', async () => {
    const res = await request(server).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a single user by ID', async () => {
    const res = await request(server).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser1');
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/users')
      .send({ username: 'newuser', email: 'new@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'newuser');
  });

  it('should update an existing user', async () => {
    const res = await request(server)
      .put('/users/1')
      .send({ username: 'updateduser', email: 'updated@example.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });

  it('should delete a user', async () => {
    const res = await request(server).delete('/users/2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'User deleted');
  });
});

