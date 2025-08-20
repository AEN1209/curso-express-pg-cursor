const express = require('express');
const user_routes = require('./routes/user.routes'); // Import user routes

const app = express();
app.use(express.json());

// Use user routes
app.use('/users', user_routes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server; // Export server for testing

