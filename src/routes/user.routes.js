  const express = require('express');
  const router = express.Router();

  const {
    createUser,
    getUsers,
    getUserRole,
    getUsersNumber,
    updateUserRole
  } = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

  router.post('/users', createUser);
  router.get('/all-users', getUsers);
  router.get('/users-number', getUsersNumber);
  router.get('/users/role/:email', getUserRole);
  router.patch('/users/role/:email', updateUserRole);

  module.exports = router;  