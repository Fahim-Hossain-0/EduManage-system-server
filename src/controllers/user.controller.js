const userModel = require("../models/user.model");

// Create user
const createUser = async (req, res) => {
  try {
    const result = await userModel.createUser(req.body);

    res.status(201).json({
      message: "User created",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const users = await userModel.getUsers(page, limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getUsersNumber = async (req, res) => {
  try {
    const users = await userModel.getUsersNumber();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by email

// const getUserRole = async (req, res) => {
//   // console.log('headers', req.headers);
//   try {
//     const email = req.params.email;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }
//     const user = await userModel.getUserRole(email);

//     if (!user) {
//   return res.status(404).json({ role: "student" });
// }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ role: user.role });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getUserRole = async (req, res) => {
  try {
    const email = req.params.email;

    if (email !== req.decoded.email) {
      return res.status(403).send({
        message: "Forbidden Access"
      });
    }

    const user = await userModel.getUserRole(email);

    res.send({
      role: user?.role || "student"
    });

  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const email = req.params.email;
    const role = req.body.role;

    const result = await userModel.updateUserRole(email, role);

    res.json({ message: "User role updated", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserRole,
  updateUserRole,
  getUsersNumber,
};
