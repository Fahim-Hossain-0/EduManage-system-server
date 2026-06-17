
const { getDB } = require('../config/db');

// const collection = () => getDB().collection('users');

const collection = async () => {
  const db = await getDB();
  return db.collection("users");
};

// Create user
const createUser = async (userData) => {
  const users = await collection();

  return await users.updateOne(
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
  const users = await collection();

    // total users count
    const totalUsers = await users.countDocuments();

    // paginated users
    const result = await users
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

    const users = await collection();

    const total = await users.countDocuments();

    const teachers = await users.countDocuments({ role: "teacher" });

    const students = await users.countDocuments({ role: "student" });

    return { total, teachers, students };
};

const getUserRole = async(email)=>{
  const users = await collection();
  return await users.findOne({email})
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

  const users = await collection();
  return await users.updateOne(filter, updateDoc);
};

module.exports = {
  createUser,
  getUsers,
  getUsersNumber,
  getUserRole,
  updateUserRole
};