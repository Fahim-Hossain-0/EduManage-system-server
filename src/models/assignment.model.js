const { getDB } = require("../config/db");

const collection = () =>
  getDB().collection("assignments");

// Create Assignment

const createAssignment = async (
  assignmentData
) => {
  const result =
    await collection().insertOne(
      assignmentData
    );

  return result;
};

// Get Assignments By Class

const getAssignmentsByClass =
  async (classId) => {
    const result =
      await collection()
        .find({ classId })
        .sort({
          createdAt: -1,
        })
        .toArray();

    return result;
  };

  const getStudentSubmissions =
  async (
    email,
    classId
  ) => {
    return await collection()
      .find({
        studentEmail: email,
        classId,
      })
      .toArray();
  };

module.exports = {
  createAssignment,
  getAssignmentsByClass,
  getStudentSubmissions
};