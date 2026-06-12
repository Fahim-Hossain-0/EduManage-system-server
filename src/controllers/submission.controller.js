const { ObjectId } = require("mongodb");

const { getDB } =
  require("../config/db");

const submissionModel =
  require("../models/submission.model");

// ====================
// CREATE SUBMISSION
// ====================

const createSubmission =
  async (req, res) => {
    try {
      const result =
        await submissionModel.createSubmission(
          req.body
        );

      if (!result.success) {
        return res
          .status(400)
          .send(result);
      }

      await getDB()
        .collection("assignments")
        .updateOne(
          {
            _id: new ObjectId(
              req.body.assignmentId
            ),
          },
          {
            $inc: {
              submissionCount: 1,
            },
          }
        );

      res.send(result);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: error.message,
      });
    }
  };

// ====================
// GET STUDENT SUBMISSIONS
// ====================

const getStudentSubmissions =
  async (req, res) => {
    try {
      const email =
        req.params.email;

      const classId =
        req.params.classId;

      const result =
        await submissionModel.getStudentSubmissions(
          email,
          classId
        );

      res.send(result);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: error.message,
      });
    }
  };

// ====================
// GET ASSIGNMENT SUBMISSIONS
// ====================

const getAssignmentSubmissions =
  async (req, res) => {
    try {
      const assignmentId =
        req.params.assignmentId;

      const result =
        await submissionModel.getAssignmentSubmissions(
          assignmentId
        );

      res.send(result);
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: error.message,
      });
    }
  };

module.exports = {
  createSubmission,
  getStudentSubmissions,
  getAssignmentSubmissions,
};