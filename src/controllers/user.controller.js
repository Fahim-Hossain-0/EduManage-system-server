const userModel = require('../models/user.model');

// Create user
const createUser = async (req, res) => {
  try {
    const result = await userModel.createUser(req.body);

    res.status(201).json({
      message: 'User created',
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers
};