const { getDB } = require('../config/db');

const collection = () => getDB().collection('users');

// Create user
const createUser = async (userData) => {
  return await collection().insertOne(userData);
};

// Get all users
const getUsers = async () => {
  return await collection().find().toArray();
};

module.exports = {
  createUser,
  getUsers
};