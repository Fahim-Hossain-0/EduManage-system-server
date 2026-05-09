const { get } = require('../app');
const { getDB } = require('../config/db');

const collection = () => getDB().collection('users');

// Create user
const createUser = async (userData) => {

  const filter = {
    email: userData.email
  };

  const updateDoc = {

    $set: {
      name: userData.name,
      image: userData.image,
      role: userData.role,
      last_log_in: userData.last_log_in,
    },

    $setOnInsert: {
      created_at: userData.created_at,
    },
  };

  const options = {
    upsert: true
  };

  return await collection().updateOne(
    filter,
    updateDoc,
    options
  );
};

// Get all users
const getUsers = async () => {
    const allUserNumber = await collection().countDocuments();
    const users = await collection().find().toArray();
    return { users, allUserNumber };
};

const getUserRole = async(email)=>{
  return await collection().findOne({email})
}




module.exports = {
  createUser,
  getUsers,
  getUserRole,


};