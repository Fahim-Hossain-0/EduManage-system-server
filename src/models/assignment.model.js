const { getDB } = require("../config/db");

const collection = () =>
  getDB().collection("assignments");

// ====================
// CREATE ASSIGNMENT
// ====================

const createAssignment =
  async (assignmentData) => {
    return await collection().insertOne(
      assignmentData
    );
  };

// ====================
// GET ASSIGNMENTS BY CLASS
// ====================

const getAssignmentsByClass =
  async (classId) => {
    return await collection()
      .find({
        classId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();
  };

module.exports = {
  createAssignment,
  getAssignmentsByClass,
};