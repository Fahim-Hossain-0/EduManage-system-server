const express = require("express");
const router = express.Router();

const {
    
  createTeacher,
  teacherRequestApprove,
  teacherRequestReject,
  getAllTeacherRequests,

} = require("../controllers/teacher.controller.js");

router.get("/teacher-requests", getAllTeacherRequests);
router.post("/teacher-requests", createTeacher);
router.patch("/teacher-requests/approve/:id", teacherRequestApprove);
router.patch("/teacher-requests/reject/:id", teacherRequestReject);

module.exports = router;
