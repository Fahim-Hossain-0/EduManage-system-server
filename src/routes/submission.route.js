const express = require("express");

const router = express.Router();

const {
  createSubmission,
  getStudentSubmissions,
  getAssignmentSubmissions,
} = require("../controllers/submission.controller");

router.post("/submissions", createSubmission);

router.get("/submissions/:email/:classId", getStudentSubmissions);

router.get("/assignment-submissions/:assignmentId", getAssignmentSubmissions);

module.exports = router;
