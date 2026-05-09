const express = require('express');
const router = express.Router();

const {
  createUser,
  getUsers,
    getUserRole,
  updateLastLogin

} = require('../controllers/user.controller');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/role/:email',getUserRole)
router.patch('/', updateLastLogin);


module.exports = router;