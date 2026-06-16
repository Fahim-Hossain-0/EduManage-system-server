const express = require("express");

const router = express.Router();

const {
  createEvaluation,
  getClassEvaluations,
  getStudentEvaluation,
  getAllEvaluations,
} = require("../controllers/evaluation.controller");

router.post("/evaluations", createEvaluation);

router.get("/evaluations/:classId", getClassEvaluations);
router.get("/evaluations/:classId/:email", getStudentEvaluation);

router.get("/evaluations", getAllEvaluations);

module.exports = router;
