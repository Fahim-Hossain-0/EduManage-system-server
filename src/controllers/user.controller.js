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

// get user by email

const getUserRole = async(req,res)=>{
  try {
    const email = req.params.email
    if(!email){
      return res.status(400).json({message:"Email is required"})
    }
    const user = await userModel.getUserRole(email);

    if(!user){
      return res.status(404).json({message:"User not found"})
    }
  } catch (error) {

    
  }
}

const updateLastLogin = async (req, res) => {
  try{
    const {email} =req.body
    if(!email){
      return res.status(400).json({message:"Email is required"})
    }
    const filter = {email}
    const updateDoc = {
      $set:{
        last_log_in: new Date()
      }
  }
  const result = await userModel.updateLastLogin(filter,updateDoc)
  res.json(result)
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserRole,
  updateLastLogin
};