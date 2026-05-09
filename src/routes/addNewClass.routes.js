const express = require('express');
const router = express.Router();

const {
    addNewClass,
    getAllClasses

} = require('../controllers/addNewClass.controller');

router.post('/add-class', addNewClass);
router.get('/all-classes', getAllClasses);


module.exports = router;