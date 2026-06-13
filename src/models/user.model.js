
const { getDB } = require('../config/db');

const collection = () => getDB().collection('users');

// Create user
const createUser = async (userData) => {
  return await collection().updateOne(
    {
      email: userData.email,
    },
    {
      $set: {
        name: userData.name,
        image: userData.image,
        last_log_in:
          userData.last_log_in,
      },

      $setOnInsert: {
        role: "student",
        created_at:
          userData.created_at,
      },
    },
    {
      upsert: true,
    }
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