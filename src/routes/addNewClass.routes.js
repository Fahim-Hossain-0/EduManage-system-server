const express = require('express');
const router = express.Router();

const {
    addNewClass,
    getAllClasses,
    getMyClasses,
    updateClassStatus,
    getPendingClasses


} = require('../controllers/addNewClass.controller');

router.post('/add-class', addNewClass);
router.get('/all-classes', getAllClasses);
router.get('/my-classes/:email', getMyClasses);
router.get('/pending-classes', getPendingClasses);
router.patch('/classes/status/:id', updateClassStatus);



module.exports = router;