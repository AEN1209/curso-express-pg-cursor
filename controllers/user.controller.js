const UserModel = require('../models/user.model');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = await UserModel.create(username, email);
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updatedUser = await UserModel.update(id, username, email);
      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const rowCount = await UserModel.delete(id);
      if (rowCount === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = UserController;
