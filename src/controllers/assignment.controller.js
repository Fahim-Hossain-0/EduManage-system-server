const assignmentModel =
  require("../models/assignment.model");

// ====================
// CREATE ASSIGNMENT
// ====================

const createAssignment =
  async (req, res) => {
    try {
      const result =
        await assignmentModel.createAssignment(
          req.body
        );

      res.status(201).send(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

// ====================
// GET ASSIGNMENTS BY CLASS
// ====================

const getAssignmentsByClass =
  async (req, res) => {
    try {
      const classId =
        req.params.classId;

      const result =
        await assignmentModel.getAssignmentsByClass(
          classId
        );

      res.send(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  };

module.exports = {
  createAssignment,
  getAssignmentsByClass,
};