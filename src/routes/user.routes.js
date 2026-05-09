const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserRole,

} = require('../controllers/user.controller');

router.post('/users', createUser);
router.get('/all-users', getUsers);
router.get('/users/role/:email',getUserRole)


module.exports = router;