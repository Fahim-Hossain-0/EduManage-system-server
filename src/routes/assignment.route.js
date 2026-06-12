const express = require("express");

const router = express.Router();

const {
  createAssignment,
  getAssignmentsByClass,
} = require("../controllers/assignment.controller");

router.post("/assignments", createAssignment);

router.get("/assignments/:classId", getAssignmentsByClass);

module.exports = router;
