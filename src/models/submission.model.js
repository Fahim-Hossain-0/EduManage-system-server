const { getDB } = require("../config/db");

// const collection = () =>
//   getDB().collection("submissions");

const collection = async () => {
  const db = await getDB();
  return db.collection("submissions");
};
// ====================
// CREATE SUBMISSION
// ====================

const createSubmission = async (data) => {
  const submissionCollection = await collection();
  const existing =
    await submissionCollection.findOne({
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
    await submissionCollection.insertOne(data);

  return {
    success: true,
    data: result,
  };
};

// ====================
// STUDENT SUBMISSIONS
// ====================

const getStudentSubmissions =
  async (email, classId) => {
    const submissionCollection = await collection();
    return await submissionCollection
      .find({
        studentEmail: email,
        classId: classId,
      })
      .toArray();
  };

// ====================
// ASSIGNMENT SUBMISSIONS
// ====================

const getAssignmentSubmissions =
  async (assignmentId) => {
    const submissionCollection = await collection();
    return await submissionCollection
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