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
// Get all users with pagination

const getUsers = async (page, limit) => {

    // total users count
    const totalUsers = await collection()
        .countDocuments();

    // paginated users
    const result = await collection()

        .find()

        .skip((page - 1) * limit)

        .limit(parseInt(limit))

        .toArray();

    return {
        result,
        totalUsers
    };
};
const getUsersNumber = async () => {

    const total = await collection().countDocuments();

    const teachers = await collection().countDocuments({ role: "teacher" });

    const students = await collection().countDocuments({ role: "student" });

    return { total, teachers, students };
};

const getUserRole = async(email)=>{
  return await collection().findOne({email})
}

const updateUserRole = async (email, role) => {

  const filter = {
    email
  };
  const updateDoc = {
    $set: {
      role
    }
  };

  return await collection().updateOne(filter, updateDoc);
};

module.exports = {
  createUser,
  getUsers,
  getUsersNumber,
  getUserRole,
  updateUserRole
};