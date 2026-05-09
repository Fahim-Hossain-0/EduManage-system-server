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

const getUserRole = async(email)=>{
  return await collection().findOne({email})
}

const updateLastLogin = async (filter,updateDoc) => {
  const result = await collection().updateOne(filter,updateDoc)

  return result
}


module.exports = {
  createUser,
  getUsers,
  updateLastLogin

};