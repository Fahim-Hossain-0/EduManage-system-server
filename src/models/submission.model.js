const { getDB } = require("../config/db");

const collection = () =>
  getDB().collection("submissions");

const createSubmission = async (data) => {
  const existing =
    await collection().findOne({
      assignmentId: data.assignmentId,
      studentEmail: data.studentEmail,
    });

  if (existing) {
    return {
      success: false,
      message:
        "You already submitted this assignment",
    };
  }

  const result =
    await collection().insertOne(data);

  return {
    success: true,
    data: result,
  };
};

// ======================
// GET STUDENT SUBMISSIONS
// ======================

const getStudentSubmissions = async (
  email,
  classId
) => {
  return await collection()
    .find({
      studentEmail: email,
      classId: classId,
    })
    .toArray();
};

const getAssignmentSubmissions = async (
  assignmentId
) => {
  return await collection()
    .find({
      assignmentId,
    })
    .toArray();
};

module.exports = {
  createSubmission,
  getStudentSubmissions,
  getAssignmentSubmissions,
};

module.exports = {
  createSubmission,
  getStudentSubmissions,
  getAssignmentSubmissions,
};